	function TestStandard(name,issue,allowedRef,fibreType,maxLength,refLoss, connectorLossTestcord, connectorLoss,spliceLoss, testWavelengths) {
		var self = this;
		self.name = name;
		self.issue = issue;
		self.allowedReferenceMethods = allowedRef;
		self.fibreType = fibreType;
		self.maxLength = maxLength;
		self.referenceLoss = refLoss;
		self.connectorLossTestcord = connectorLossTestcord;
		self.connectorLoss = connectorLoss ;			
		self.spliceLoss = spliceLoss 
		self.testWavelengths = testWavelengths ;
	};
	
	function TestWavelength( lambda, uncertaintyAllowance, lossPerKm, maxLoss ) {
		var self = this;
		self.lambda = lambda;
		self.uncertaintyAllowance = uncertaintyAllowance
		self.lossPerKm = lossPerKm;
		self.maxLoss = maxLoss;
	};
	
	standards = [
	
		new TestStandard("TIA 568-C-0/526-7 : SM Link" , '2.2','1,2','OM1','',0.1,0.3,0.75,0.3, 
			[ 
				new TestWavelength(1310, 0.1,1.0,''),
				new TestWavelength(1550, 0.1,1.0,''),
			]
		) ,
		
		new TestStandard("TIA 568-C-0/526-15-A : MM Link" , '2.2','1,2','OM1','',0.1,0.3,0.75,0.3, 
			[ 
				new TestWavelength(850, 0.1,3.5,''),
				new TestWavelength(1300, 0.1,1.5,''),
			]
		) ,

		new TestStandard("IEC 11801 / 14763-3:  OS1 SMF Link" , '2.2','1,2','OS1','',0.2,0.3,0.75,0.3, 
			[
				new TestWavelength(1310, 0.1,1.5,''),
				new TestWavelength(1550, 0.1,1.5,''),		
			]
		) ,
		new TestStandard("IEC 11801 / 14763-3:  MM Link" , '2.2','1,2','OM1','',0.1,0.3,0.75,0.3, 
			[ 
				new TestWavelength(850, 0.1,3.5,''),
				new TestWavelength(1300, 0.1,3.5,''),
			]
		) ,
	];
