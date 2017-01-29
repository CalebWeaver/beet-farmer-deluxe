QUnit.test( "Make Unit", function( assert ) {
	var unit = new UnitModel(0,1);
	unit.increment();
	assert.equal(unit.unit(), 1, "Missing unit increment" );
});