
function safeNum(value) {
    if ( isNaN(value) )
            return 0;
    else
            return parseFloat(value);
};



function CalculatorViewModel() {
    var self = this;
    self.distanceUnits =  [
            {name:'Kilometres',value: 1},
            {name:'Metres', value: .001},
            {name:'Miles', value: 1.6093},
            {name:'Feet', value: .0016093},
            
    ];
    self.cableLength = ko.observable(20);
    self.selectedDistanceUnits = ko.observable(1);
    self.adjustedDistance = ko.computed(function() {
            return self.cableLength() * self.selectedDistanceUnits().value
    });
    
    self.numberOfConnectors = ko.observable(2);
    self.numberOfSplices = ko.observable(2);
    
    self.availableStandards = standards;
    self.selectedStandard = ko.observable(standards[0]);
    

    self.splitterLoss = ko.observable(0);
    self.switchLoss = ko.observable(0);
    self.otherLoss = ko.observable(0);
    
    self.connectorLoss = ko.computed(function() {
        if ( self.selectedStandard) {
            return safeNum(self.selectedStandard().connectorLoss * self.numberOfConnectors() );
        }			
    });
    
    self.totalOtherLoss = ko.computed(function() {
        val = safeNum(self.splitterLoss()) + safeNum(self.switchLoss()) + safeNum(self.otherLoss());
        return val;
    });
    
    self.spliceLoss = ko.computed(function() {
        if ( self.selectedStandard ) {
            return safeNum(self.selectedStandard().spliceLoss * self.numberOfSplices() );
        }
    });


    self.detailIsVisible = ko.observable(0);
    self.toggleDetail = function() {
        self.detailIsVisible( ! self.detailIsVisible());
    };


    self.validParamters = ko.computed(function() {
            return true;
    });
    
    self.lossResults = ko.computed( function() {
        var lossValues = [];
        ko.utils.arrayForEach(self.selectedStandard().testWavelengths,function(wl) {
            var fibreLoss =  self.adjustedDistance() * wl.lossPerKm    
            var totalLoss = fibreLoss + self.spliceLoss() + self.connectorLoss() + self.totalOtherLoss(); 
            lossValues.push(
                { testWavelength: wl ,
                  fibreLoss: fibreLoss, 
                  totalLoss: totalLoss 
                });
        });
        return lossValues;
    });
    

    

};


