	
	function safeNum(value) {
		if ( isNaN(value) )
			return 0;
		else
			return parseFloat(value);
	};
	
	function LossResult(parent,testWavelength) {
		var self = this;
		
		self.testWavelength = testWavelength;			
		self.fibreLoss =  parent.adjustedDistance() * self.testWavelength.lossPerKm ;
		self.totalLoss =  self.fibreLoss + parent.totalConnectorLoss() + parent.totalSpliceLoss() + parent.totalOtherLoss() ;		
	}
	
	
	
	
	function CalculatorViewModel() {
		var self = this;
	    self.distanceUnits =  [
			{name:'Kilometres',value: 1},
			{name:'Metres', value: .001},
			{name:'Miles', value: 1.6093},
			{name:'Feet', value: .0016093},
			
		];
		self.cableLength = ko.observable();
		self.selectedDistanceUnits = ko.observable();
		
		self.numberOfConnectors = ko.observable();
		self.numberOfSplices = ko.observable();
		
		self.availableStandards = standards;
		self.selectedStandard = ko.observable(standards[0]);
		
	
		self.splitterLoss = ko.observable();
		self.switchLoss = ko.observable();
		self.otherLoss = ko.observable();
		
		self.totalConnectorLoss = ko.computed(function() {
			if ( self.selectedStandard) {
				return safeNum(self.selectedStandard.connectorLoss * self.numberOfConnectors() );
			}			
		});
		
		self.totalOtherLoss = ko.computed(function() {
			val = safeNum(self.splitterLoss()) + safeNum(self.switchLoss()) + safeNum(self.otherLoss());
			return val;
		});
		
		self.totalSpliceLoss = ko.computed(function() {
			if ( self.selectedStandard ) {
				return safeNum(self.selectedStandard.spliceLoss * self.numberOfSplices() );
			}
		});
	

		
		self.validParamters = ko.computed(function() {
				return true;
		});
		
		self.lossResults = ko.observableArray();
		
		self.adjustedDistance = ko.computed(function() {
			if (self.selectedDistanceUnits() !== undefined && self.selectedDistanceUnits().value !== undefined )
				return self.cableLength() * self.selectedDistanceUnits().value
			return 
				0;
		});
				
		self.selectedStandard.subscribe(function(newStandard) {
			if ( newStandard  !== undefined ) {		
				console.log(newStandard);
				self.lossResults().removeAll();			
				ko.utils.arrayForEach(newStandard.testWavelengths,function(wl) {
					
					self.lossResults().push(new LossResult(self,wl));
				});
				console.log(self.lossResults());
			}
		}.bind(self));

	};
	
	