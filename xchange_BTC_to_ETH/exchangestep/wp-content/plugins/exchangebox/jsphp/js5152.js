jQuery(function($){
	
    $('.ajax_post_form, .exbajaxpostform').ajaxForm({
        dataType:  'json',
		beforeSubmit: function(a,f,o) {
			f.addClass('thisactive');
			$('.thisactive input[type=submit], .thisactive input[type=button]').attr('disabled',true);
			$('.thisactive').find('.ajax_submit_ind').show();
        },
        success: function(ht) {
		
			if(ht['otv'] == 'error'){
				$('.thisactive .resultgo').html('<div class="exbresfalse"><div class="exbresclose"></div>'+ht['text']+'</div>');
			}
			if(ht['otv'] == 'success'){
				$('.thisactive .resultgo').html('<div class="exbrestrue"><div class="exbresclose"></div>'+ht['text']+'</div>');
			}
			if(ht['otv'] == 'success_clear'){
				$('.thisactive .resultgo').html('<div class="exbrestrue"><div class="exbresclose"></div>'+ht['text']+'</div>');
				$('.thisactive input[type=text], .thisactive input[type=password], .thisactive textarea').attr('value','');
			}			
		
			if(ht['url']){
				window.location.href = ht['url']; 
			}
			
			/* captcha */
	if(ht['ncapt1']){
		$('.captcha1').attr('src',ht['ncapt1']);
	}
	if(ht['ncapt2']){
		$('.captcha2').attr('src',ht['ncapt2']);
	}
/* end captcha */
		
		    $('.thisactive input[type=submit], .thisactive input[type=button]').attr('disabled',false);
			$('.thisactive').find('.ajax_submit_ind').hide();
			$('.thisactive').removeClass('thisactive');
			
        }
    });	
	
});

/* captcha */
jQuery(function($){
	$('.captcha_reload').live('click',function(){

		var thet = $(this);
		thet.addClass('act');	
	
		var dataString='have=reload';
		$.ajax({
		type: "POST",
		url: "https://exxe.club/ajax-sc_reload.html?notcsrf=58c2fcedc5",
		dataType: 'json',
		data: dataString,
		success: function(ht)
		{
			if(ht['ncapt1']){
				$('.captcha1').attr('src',ht['ncapt1']);
			}
			if(ht['ncapt2']){
				$('.captcha2').attr('src',ht['ncapt2']);
			}	

			thet.removeClass('act');
		}
		});
		
		return false;
	});
});	
/* end captcha */
	
/* request reserve */
jQuery(function($){
	
	$('.zaprosvalutrelvn').live('click', function(){
		var title = 'Request to reserve ' + $(this).attr('title');
        var id = $(this).attr('name');		
		$('#rezerv_titls').html(title);	
		$('#rezerv_ids').attr('value',id);
		$('#exbprezshadow, .exbprezbox').show();
		$('.exbprezboxvn .resultgo').html(' ');	
			
	    var hei = Math.ceil(($(window).height() - $('.exbprezboxvn').height()) / 2);
	    $('.exbprezbox').css({'top':hei});			
			
	    return false;
	});	
	
    $('.exbprezboxclose').live('click', function(){
		$('#exbprezshadow, .exbprezbox').hide();
    });		
});
/* end request reserve */	
	
/* tootltip */
jQuery(function($){
	
    $('.toolinput').live('mouseenter', function(){
        $(this).parents('.parenttool').find('.exchboxtool').slideDown(200);
    });	
    $('.toolinput').live('mouseleave', function(){
        $(this).parents('.parenttool').find('.exchboxtool').hide();
    });
	
});
/* end tootltip */
	
/* exchange table */
jQuery(function($){
	
	function checknumbr(mixed_var) {
		return ( mixed_var == '' ) ? false : !isNaN( mixed_var );
	}		
	
	function goed_peremen(summ, dej){
		var id = $('#wnapobmenid').val();
		
		var dataString = 'id='+id+'&summ='+summ+'&dej='+dej;
        $.ajax({
            type: "POST",
            url: "https://exxe.club/ajax-exchange_peremen.html?notcsrf=58c2fcedc5",
            data: dataString,
	        dataType: 'json',
            success: function(ht){
                
				if(dej !== 1){
					$('#wsumm1').val(ht['s1']);
				}
				if(dej !== 2){
					$('#wsumm2').val(ht['s2']);
				}
				if(dej !== 3){
					$('#wsummcom1').val(ht['sc1']);
				}
				if(dej !== 4){
					$('#wsummcom2').val(ht['sc2']);
				}
				
				$('#wcomtext-1').html(ht['sctxt1']);
				$('#wcomtext-2').html(ht['sctxt2']);
				
				if(ht['summ1_error'] == 1){
					$('#wsumm1').parents('.changewoerr').addClass('err');
					$('#wsumm1').parents('.changewoerr').find('.wowarnerr').html(ht['summ1_error_text']);
				} else {
					$('#wsumm1').parents('.changewoerr').removeClass('err');					
				}
				if(ht['summ2_error'] == 1){
					$('#wsumm2').parents('.changewoerr').addClass('err');
					$('#wsumm2').parents('.changewoerr').find('.wowarnerr').html(ht['summ2_error_text']);
				} else {
					$('#wsumm2').parents('.changewoerr').removeClass('err');
				}
				if(ht['summ1c_error'] == 1){
					$('#wsummcom1').parents('.changewoerr').addClass('err');
					$('#wsummcom1').parents('.changewoerr').find('.wowarnerr').html(ht['summ1c_error_text']);
				} else {
					$('#wsummcom1').parents('.changewoerr').removeClass('err');
				}
				if(ht['summ2c_error'] == 1){
					$('#wsummcom2').parents('.changewoerr').addClass('err');
					$('#wsummcom2').parents('.changewoerr').find('.wowarnerr').html(ht['summ2c_error_text']);
				} else {
					$('#wsummcom2').parents('.changewoerr').removeClass('err');
				}
				
            }
		});					    
		
	}
	
		$('#wsumm1').live('keyup',function(){
			var vale = $(this).val().replace(/,/g,'.');
			if (checknumbr(vale)) {
				goed_peremen(vale, 1);
			} else {
				$(this).parents('.changewoerr').addClass('err');
			}

		    return false;
		});
		$('#wsumm2').live('keyup',function(){
			var vale = $(this).val().replace(/,/g,'.');
			if (checknumbr(vale)) {
				goed_peremen(vale, 2);
			} else {
				$(this).parents('.changewoerr').addClass('err');
			}

		    return false;
		});	
		$('#wsummcom1').live('keyup',function(){
			var vale = $(this).val().replace(/,/g,'.');
			if (checknumbr(vale)) {
				goed_peremen(vale, 3);
			} else {
				$(this).parents('.changewoerr').addClass('err');
			}

		    return false;
		});
		$('#wsummcom2').live('keyup',function(){
			var vale = $(this).val().replace(/,/g,'.');
			if (checknumbr(vale)) {
				goed_peremen(vale, 4);
			} else {
				$(this).parents('.changewoerr').addClass('err');
			}

		    return false;
		});	
	
});
	
/* exchange table */
jQuery(function($){
	
    $('input').live('click', function(){
        $(this).parents('.changewoerr').removeClass('err');
    });
    $('input').live('keyup', function(){
        $(this).parents('.changewoerr').removeClass('err');
    });		
	
function add_error_in(id, text){
	if(text.length > 0){
		id.parents('.changewoerr').addClass('err');
		id.parents('.changewoerr').find('.wowarnerr').html(text);
	}
}		

    $('.ajax_post_bids').ajaxForm({
        dataType: 'json',
		beforeSubmit: function(a,f,o) {
			f.addClass('thisactive');
			$('.thisactive input[type=submit]').attr('disabled',true);
			$('.ajax_post_bids_res').html('<div class="resulttrue">Please wait while the exchange</div>');
        },		
        success: function(ht) {
			    if(ht['otv'] == 'success'){
				    window.location.href = ht['url']; 
			    } else if(ht['otv']== 'error'){
					if (ht['errftext']) {
						add_error_in($('#obmen_f'), ht['errftext']);
					}
					if (ht['erritext']) {
						add_error_in($('#obmen_i'), ht['erritext']);
					}
				    if (ht['errotext']) {
						add_error_in($('#obmen_o'), ht['errotext']);
					}
					if (ht['errs1text']) {
						add_error_in($('#wschet1'), ht['errs1text']);
					}					
					if (ht['errs2text']) {
						add_error_in($('#wschet2'), ht['errs2text']);
					}					
					if (ht['erremailtext']) {
						add_error_in($('#obmen_email'), ht['erremailtext']);
					}					
					if (ht['errteltext']) {
						add_error_in($('#obmen_tel'), ht['errteltext']);
					}					
					if (ht['errskypetext']) {
						add_error_in($('#obmen_skype'), ht['errskypetext']);
					}					
					if (ht['errin1text']) {
						add_error_in($('#wsumm1'), ht['errin1text']);
					}					
					if (ht['errin2text']) {
						add_error_in($('#wsumm2'), ht['errin2text']);
					}					
										
					if (ht['narr']) {
						var narr = ht['narr'];
						for (var i = 0; i < narr.length; i++) {
							var dpid = narr[i];
							add_error_in($('#doppole'+dpid), 'Error!');
						}
					}
					
					alert(ht['text']);
			    } else {
				    alert(ht['text']);
				}
				if(ht['ncapt1']){
				    $('.captcha1').attr('src',ht['ncapt1']);
				}
				if(ht['ncapt2']){
				    $('.captcha2').attr('src',ht['ncapt2']);
				}	
		    $('.thisactive input[type=submit]').attr('disabled',false);
			$('.thisactive').removeClass('thisactive');				
        }
    });					
	
});
/* end exchange table */	
	
jQuery(function($){

	$('.leftgo').live('click', function(){
	    var id = $(this).attr('id').replace('napobmen-','');
		$('.leftgo, .tabhome').removeClass('act');
		$(this).addClass('act');
		$('#napobmento-'+id).addClass('act');
	    return false;
	});	

});			
	
/* exchange widget */
jQuery(function($){

	var countwidget = $('#widgetobmentable').length;
	if(countwidget > 0){ 

		$('a.onehrine').live('click', function(){
	        var xname1 = $(this).find('input[name=xname1]').val();
			var xname2 = $(this).find('input[name=xname2]').val();
			$('a.onehrine').removeClass('active');
			$(this).addClass('active');
			
            var dataString = 'xname1='+xname1+'&xname2='+xname2;			
            $.ajax({
            type: "POST",
            url: "https://exxe.club/ajax-widtable.html?notcsrf=58c2fcedc5",
            data: dataString,
	        dataType: 'json',
            success: function(ht){
		        if(ht['table']){
				    $('#widgetobmentable').html(ht['table']);
			    } else {
			        alert('Error!');
			    }
            }
            });				
			
	        return false;
	    });
	
    }	

});
/* end exchange widget */	
	
/* partners */
jQuery(function($){
    $(".promo_menu li a").live('click',function () {
        if(!$(this).hasClass('act')){
		    $(".pbcontainer, .promo_menu li").removeClass('act');
		    $(".pbcontainer").filter(this.hash).addClass('act');
		    $(this).parents('li').addClass('act');
        }
        return false;
    });
	
    $(".bannerboxlink a").click(function() {
        var text = $(this).text();
		var st = $(this).attr('show-title');
		var ht = $(this).attr('hide-title');
		
        if(text == st){
            $(this).html(ht);
        } else {
            $(this).html(st);
        }
        $(this).parents(".bannerboxone").find("textarea").toggle();
	    $(this).toggleClass('act');

        return false;
    });
});	
/* end partners */	
/* exchange checkrule */ 
jQuery(function($){
	
	$('#createzaja').live('click', function(){
	    var vale = $('#createzajatos').val();
	    if(vale != 1){
		    alert('You do not accept the conditions');
		    return false;
		}
	});	
	
	$('.iampay').live('click', function(){
		if (!confirm("Are you sure you pay a claim?")) {
			return false;
		}
	});		
			
});	
/* end exchange checkrule */	
/* exchange_timer */
jQuery(function($){
	
	if($('#check_payment_div').length > 0){
		
		var nowdata = 0;
		var redir = 0;
		function check_payment_now(){
				
			nowdata = parseInt(nowdata) + 1;
			if(redir == 0){
				if(nowdata > 30){
					var durl = $('#check_payment_div').attr('data-url');
					window.location.href = durl;
					redir = 1;
				}	
			}
			
		}
		
		setInterval(check_payment_now,1000);
		
	}
	
});	
/* end exchange_timer */	
	
/* tarifs */
jQuery(function($){

	$('.javahref').live('click', function(){
	    var the_link = $(this).attr('name');
	    window.location = the_link;
	});

});		
/* end tarifs */
	
/* exchange exchange step1 */
jQuery(function($){

    $('.rselected').live('click', function(){
	    $('.rselected').removeClass('act');
		$(this).addClass('act');		
        return false;
    });
	
    $(document).click(function(event) {
        if ($(event.target).closest(".rselected").length) return;
        $(".rselected").removeClass('act');
        event.stopPropagation();
    });	
	
function big_ajax_zapros(ids,idtab,idtab2){
    var dataString = 'ids='+ids+'&idtab='+idtab+'&idtab2='+idtab2;	
    $.ajax({
        type: "POST",
        url: "https://exxe.club/ajax-exchange_step1.html?notcsrf=58c2fcedc5",
        data: dataString,
	    dataType: 'json',
        success: function(ht){
		    if(ht['otv'] == 'success'){
			    $('title').html(ht['title']);
				$('#ajaxtitlepager, .js_exchangestep_title').html(ht['title2']);
				$('#ajaxnapsterm1').html(ht['text1']);
				$('#ajaxnapsterm2').html(ht['text2']);
				$('#ajaxobmen1').html(ht['ajaxobmen1']);
				$('#ajaxobmen2').html(ht['ajaxobmen2']);
				$('#wnapobmenid').attr('value', ht['idobmen']);
				var thelink = ht['thelink'];
				if(thelink){
					window.history.replaceState(null, null, thelink);
				}
			} else {
			    alert(ht['text']);
			}
        }
    });		
}		
	
    $('.rselectlinemenu .rselectline').live('click', function(){
	    $(this).parents('.rselectlinemenu').find('.rselectline').removeClass('cur');
	    $(this).addClass('cur');
        $(this).parents('.rselected').removeClass('act');
		var num = $.trim($(this).attr('name'));
		var idtab = $(this).parents('.rselected').attr('name');
        $(this).parents('.rselected').find('input').val(num);
		var thethtm = $(this).html();
		$(this).parents('.rselected').find('.rselecttitlevn').html(thethtm);

		if(idtab==1){
		    var num1 = num;
			var num2 = $('.rselected:last').find('input').val();
		} else {
		    var num2 = num;
			var num1 = $('.rselected:first').find('input').val();		
		}
		
		big_ajax_zapros(idtab, num1, num2);
		
        return false;
    });	
	
});
/* end exchange step1 */	
