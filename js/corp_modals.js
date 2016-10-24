// JavaScript Document

function sModal(m) {
	hModal();
	$(window).scrollTop(0);
	$(".corp_modals_wrapper").show();
	if (m == 0) {
		$(".corp_create_account").fadeToggle('fast');
	} else {
		$(".corp_contact_catering").fadeToggle('fast');
	}
	$(".corp_white_overlay").show();
}
function hModal() {
	$(".corp_modals_wrapper").hide();
	$(".corp_create_account").hide();
	$(".corp_contact_catering").hide();
	$(".corp_white_overlay").hide();
}