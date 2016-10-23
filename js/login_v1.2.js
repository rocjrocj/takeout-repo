
function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1},g='gecko',w='webkit',s='safari',o='opera',m='mobile',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3.6')?g+' ff3 ff3_6':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('blackberry')?m+' blackberry':is('android')?m+' android':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?m+' j2me':is('iphone')?m+' iphone':is('ipod')?m+' ipod':is('ipad')?m+' ipad':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);
//CODE FOR LOGIN AREA~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var canSlide = true;
function SlideBack(){
	if (canSlide){
		canSlide=false;
		$('.white_overlay').fadeToggle('fast');
		$('#login_box').slideToggle('fast', function(){
			canSlide = true;
			document.getElementById('loginUser').focus();
		});
	}
}

var filladdress = false;

function forceLogin(){
	if (canSlide){
		canSlide=false;
		$('.white_overlay').fadeToggle('fast');
		$('#login_box').slideToggle('fast', function(){
			document.getElementById('loginUser').focus();
		});
	}
}

$('body').on("click", ".login_function", function(e){
	SlideBack();
})
$('body').on("click", ".white_overlay", function(e){
	SlideBack();
})
$('body').on('click', '.bottom_buttons', function(e){
	SlideBack();
})

function checkMatch() {
	var password = document.getElementById('createPass').value;
	var confirm = document.getElementById('confirmPass').value;
	document.getElementById('create-new').style.visibility='hidden';
	if (confirm == password) {
		document.getElementById('createPass').style.background = '#01DF01';
		document.getElementById('confirmPass').style.background = '#01DF01';
		$('.create_error').html('');
		if (document.getElementById('createUser').value != '') {
			document.getElementById('create-new').style.visibility='visible';
		}
	}
	else {
		document.getElementById('createPass').style.background = 'red';
		document.getElementById('confirmPass').style.background = 'red';
		$('.create_error').html("Oops! Those passwords don't match!");
	}
	return true;
}

function checkUserId() {
	var newUserId = document.getElementById('createUser').value;

	document.getElementById('create-new').style.visibility='hidden';

	newUserId = newUserId.replace(/[^a-zA-Z0-9_\.\+\@-]/g,'');
	newUserId = newUserId.toLowerCase();

	document.getElementById('createUser').value = newUserId;

	return $.ajax({
		url: '/auth-user.pl',
		data: {
			mode: 'checkUserId',
			newUserId: newUserId
		},
		type: 'POST',
		dataType: 'json',
		success : function(ajaxResponse) {

			if (ajaxResponse.errors) {
				var errorMsg = '';
				for (var eachError in ajaxResponse.errors) {
					errorMsg += "\n" + ajaxResponse.errors[eachError] +"\n";
				}
				document.getElementById('createUser').focus();
				$('.create_error').html(errorMsg);
				$('#createUser').addClass('error_alert');
				return false;
			}
			// either the userid is available or it is the same as you already have
			else if (ajaxResponse.success) {
				if (document.getElementById('createPass').value != '') {
					document.getElementById('create-new').style.visibility='visible';
				}
				$('.create_error').html('');
				$('#createUser').removeClass('error_alert');
				return true;
			}
			else {
				return false;
			}
		}, // end success function
		error: function( req, status, err ) {
			console.log( 'checkUserId error ', req, status, err );
		}
	}); // end checkUserId Ajax call
}

function login() {
	var userid = document.getElementById('loginUser').value;
	var pass = document.getElementById('loginPass').value;
	var remember = 0;
	if (document.getElementById('remember').checked) {
		remember = 1;
	}

	userid = userid.replace(/[^a-zA-Z0-9_\.\+\@-]/g,'');
	userid = userid.toLowerCase();

	return $.ajax({
		url: '/auth-user.pl',
		data: {
			mode: 'login',
			user: userid,
			password: pass,
			remember: remember
		},
		type: 'POST',
		dataType: 'json',
		success : function(ajaxResponse) {
			if (ajaxResponse.errors) {
				var errorMsg = '';
				for (var eachError in ajaxResponse.errors) {
					errorMsg += "\n" + ajaxResponse.errors[eachError] +"\n";
				}
				document.getElementById('loginPass').value = '';
				document.getElementById('loginPass').focus();
				$('.login_error').html(errorMsg);
				$('#loginPass').addClass('error_alert');
				$('#loginUser').addClass('error_alert');
				return false;
			}
			else if (ajaxResponse.success) {
				if (ajaxResponse.success.goloc) {
					window.location.href=ajaxResponse.success.goloc;
					return false;
				}
				if (filladdress) {
					document.getElementById('streetaddress').value = ajaxResponse.address;
				}
				document.getElementById('loginName').innerHTML = ajaxResponse.loginName;
				document.getElementById('loginLink').style.display = 'none';
				document.getElementById('logoutLink').style.display = 'inline';
				$('.login_error').html('');
				$('#loginPass').removeClass('error_alert');
				$('#loginUser').removeClass('error_alert');
				canSlide=true;
				SlideBack();
				return false;
			}
			else {
				return false;
			}
		}, // end success function
		error: function( req, status, err ) {
			console.log( 'login error ', req, status, err );
		}
	}); // end login Ajax call
}

function createNew() {
	var userid = document.getElementById('createUser').value;
	var pass = document.getElementById('createPass').value;
	var remember = 0;
	if (document.getElementById('remnew').checked) {
		remember = 1;
	}

	userid = userid.replace(/[^a-zA-Z0-9_\.\+\@-]/g,'');
	userid = userid.toLowerCase();

	return $.ajax({
		url: '/auth-user.pl',
		data: {
			mode: 'createNew',
			user: userid,
			password: pass,
			remember: remember
		},
		type: 'POST',
		dataType: 'json',
		success : function(ajaxResponse) {
			if (ajaxResponse.errors) {
				var errorMsg = '';
				for (var eachError in ajaxResponse.errors) {
					errorMsg += "\n" + ajaxResponse.errors[eachError] +"\n";
				}
				document.getElementById('createPass').value = '';
				document.getElementById('confirmPass').value = '';
				document.getElementById('create-new').style.visibility = 'hidden';
				document.getElementById('createUser').focus();
				$('.create_error').html(errorMsg);
				$('#createUser').addClass('error_alert');
				return false;
			}
			else if (ajaxResponse.success) {
				document.getElementById('loginName').innerHTML = ajaxResponse.loginName;
				document.getElementById('loginLink').style.display = 'none';
				document.getElementById('logoutLink').style.display = 'inline';
				$('.create_error').html('');
				$('#createUser').removeClass('error_alert');
				canSlide=true;
				SlideBack();
				return true;
			}
			else {
				return false;
			}
		}, // end success function
		error: function( req, status, err ) {
			console.log( 'create user error ', req, status, err );
		}
	}); // end createNew Ajax call
}
