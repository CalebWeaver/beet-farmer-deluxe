let ConstitutionTracker = (function(player, skills) {
    "use strict";

    let self = {};
    self.constitution = 1;
    self.notEnough = false;
    self.checkUseConstitution = checkUseConstitution;
    self.gainConstitution = gainConstitution;

    return self;

    function gainConstitution() {
        self.constitution += .0002;
    }

    function checkUseConstitution(constitutionReq) {
        constitutionReq = constitutionReq || 1;
        if (self.constitution >= constitutionReq) {
            self.constitution -= constitutionReq;
            return true;
        } else {
            return false;
        }
    }

})(Player, Skills);