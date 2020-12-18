(function($) {
  "use strict";


  /*----------------------------
   isotope active
  ------------------------------ */
  // portfolio start
  $(window).on("load", function() {
    var $container = $('.awesome-project-content');
    $container.isotope({
      filter: '*',
      animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: false
      }
    });
    var pro_menu = $('.project-menu li a');
    pro_menu.on("click", function() {
      var pro_menu_active = $('.project-menu li a.active');
      pro_menu_active.removeClass('active');
      $(this).addClass('active');
      var selector = $(this).attr('data-filter');
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      return false;
    });

  });
  //portfolio end




})(jQuery);
$(document).ready(function(){
	$("#overlay").fadeOut();
	$(".puzztxt").fadeOut();
	$(".obstxt").fadeOut();
	$(".skitxt").fadeOut();
	$(".ploytxt").fadeOut();
	$(".swaytxt").fadeOut();
	$(".webtxt").fadeOut();
	$(".mashtxt").fadeOut();
	$(".csgotxt").fadeOut();
	$(".visiontxt").fadeOut();
	$(".spoontxt").fadeOut();
	$(".fishestxt").fadeOut();
	$(".poesytxt").fadeOut();
	$(".soapboxtxt").fadeOut();
	$(".yogatxt").fadeOut();
	$(".chesstxt").fadeOut();
	$(".flytxt").fadeOut();
	$(".cookingtxt").fadeOut();
	$(".businesstxt").fadeOut();
	$(".playtxt").fadeOut();
	$(".twistertxt").fadeOut();
	$(".frenchtxt").fadeOut();
	$(".concordtxt").fadeOut();
	$(".budhatxt").fadeOut();
	$(".movietxt").fadeOut();
	$(".shotguntxt").fadeOut();
	$(".pixeltxt").fadeOut();
	$(".marveltxt").fadeOut();
	$(".pottxt").fadeOut();
	$(".jamhamtxt").fadeOut();
	$(".rjtxt").fadeOut();
	$(".rangolitxt").fadeOut();
	$(".indianatxt").fadeOut();
	$(".masktxt").fadeOut();
	$(".jingletxt").fadeOut();
	$(".eurekatxt").fadeOut();
	
});






$(document).ready(function(){
    $(".puzz").click(function(){
		$("#overlay").fadeIn("slow");
        $(".uio").fadeOut("slow");
		$(".puzztxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
		
    });
	$(".obs").click(function(){
		$("#overlay").fadeIn("slow");
        $(".uio").fadeOut("slow");
		$(".obstxt").delay( 1000 ).fadeIn("slow");
		
		$(".caption-content").fadeOut("slow");
		
    });
	$(".ski").click(function(){
		$("#overlay").fadeIn("slow");
        $(".uio").fadeOut("slow");
		$(".skitxt").delay( 1000 ).fadeIn("slow");
		
		$(".caption-content").fadeOut("slow");
		
    });
	$(".ploy").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".ploytxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".sway").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".swaytxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".web").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".webtxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".mash").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".mashtxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".csgo").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".csgotxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".vision").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".visiontxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".spoon").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".spoontxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".fishes").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".fishestxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".poesy").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".poesytxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".soapbox").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".soapboxtxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".yoga").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".yogatxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".chess").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".chesstxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".fly").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".flytxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".cooking").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".cookingtxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".business").click(function(){
		
        $("#overlay").fadeIn("slow"); 
		$(".uio").fadeOut("slow");
        $(".businesstxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".play").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".playtxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".twister").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".twistertxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".french").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".frenchtxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".concord").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".concordtxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".budha").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".budhatxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".movie").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".movietxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".shotgun").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".shotguntxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".pixel").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".pixeltxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".marvel").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".marveltxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".pot").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".pottxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".jamham").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".jamhamtxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".rj").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".rjtxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".rangoli").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".rangolitxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".indiana").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".indianatxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".mask").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".masktxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".jingle").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".jingletxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });
	$(".eureka").click(function(){
		$("#overlay").fadeIn("slow");
		$(".uio").fadeOut("slow");
        $(".eurekatxt").delay( 1000 ).fadeIn("slow");
		$(".caption-content").fadeOut("slow");
    });

});

$(document).ready(function(){
	$("#overlay").click(function(){
		$("#overlay").fadeOut("slow");	
		$(".caption-content").delay( 1000 ).fadeIn("slow");	
        $(".puzztxt").fadeOut("slow");
		$(".obstxt").fadeOut("slow");
		$(".skitxt").fadeOut("slow");
		$(".ploytxt").fadeOut("slow");
		$(".swaytxt").fadeOut("slow");
		$(".webtxt").fadeOut("slow");
		$(".mashtxt").fadeOut("slow");
		$(".csgotxt").fadeOut("slow");
		$(".visiontxt").fadeOut("slow");
		$(".spoontxt").fadeOut("slow");
		$(".fishestxt").fadeOut("slow");
		$(".poesytxt").fadeOut("slow");
		$(".soapboxtxt").fadeOut("slow");
		$(".yogatxt").fadeOut("slow");
		$(".chesstxt").fadeOut("slow");
		$(".flytxt").fadeOut("slow");
		$(".cookingtxt").fadeOut("slow");
		$(".businesstxt").fadeOut("slow");
		$(".playtxt").fadeOut("slow");
		$(".twistertxt").fadeOut("slow");
		$(".frenchtxt").fadeOut("slow");
		$(".concordtxt").fadeOut("slow");
		$(".budhatxt").fadeOut("slow");
		$(".movietxt").fadeOut("slow");
		$(".shotguntxt").fadeOut("slow");
		$(".pixeltxt").fadeOut("slow");
		$(".marveltxt").fadeOut("slow");
		$(".pottxt").fadeOut("slow");
		$(".jamhamtxt").fadeOut("slow");
		$(".rjtxt").fadeOut("slow");
		$(".rangolitxt").fadeOut("slow");
		$(".indianatxt").fadeOut("slow");
		$(".masktxt").fadeOut("slow");
		$(".jingletxt").fadeOut("slow");
		$(".eurekatxt").fadeOut("slow");
	});
	$("#txt").click(function(){
		$("#overlay").fadeOut("slow");	
		$(".caption-content").delay( 1000 ).fadeIn("slow");	
        $(".puzztxt").fadeOut("slow");
		$(".obstxt").fadeOut("slow");
		$(".skitxt").fadeOut("slow");
		$(".ploytxt").fadeOut("slow");
		$(".swaytxt").fadeOut("slow");
		$(".webtxt").fadeOut("slow");
		$(".mashtxt").fadeOut("slow");
		$(".csgotxt").fadeOut("slow");
		$(".visiontxt").fadeOut("slow");
		$(".spoontxt").fadeOut("slow");
		$(".fishestxt").fadeOut("slow");
		$(".poesytxt").fadeOut("slow");
		$(".soapboxtxt").fadeOut("slow");
		$(".yogatxt").fadeOut("slow");
		$(".chesstxt").fadeOut("slow");
		$(".flytxt").fadeOut("slow");
		$(".cookingtxt").fadeOut("slow");
		$(".businesstxt").fadeOut("slow");
		$(".playtxt").fadeOut("slow");
		$(".twistertxt").fadeOut("slow");
		$(".frenchtxt").fadeOut("slow");
		$(".concordtxt").fadeOut("slow");
		$(".budhatxt").fadeOut("slow");
		$(".movietxt").fadeOut("slow");
		$(".shotguntxt").fadeOut("slow");
		$(".pixeltxt").fadeOut("slow");
		$(".marveltxt").fadeOut("slow");
		$(".pottxt").fadeOut("slow");
		$(".jamhamtxt").fadeOut("slow");
		$(".rjtxt").fadeOut("slow");
		$(".rangolitxt").fadeOut("slow");
		$(".indianatxt").fadeOut("slow");
		$(".masktxt").fadeOut("slow");
		$(".jingletxt").fadeOut("slow");
		$(".eurekatxt").fadeOut("slow");
	});
	
});


$(document).ready(function(){

	    $(".cross").click(function(){
		$("#overlay").fadeOut("slow");	
		$(".caption-content").delay( 1000 ).fadeIn("slow");	
        $(".puzztxt").fadeOut("slow");
		$(".obstxt").fadeOut("slow");
		$(".skitxt").fadeOut("slow");
		$(".ploytxt").fadeOut("slow");
		$(".swaytxt").fadeOut("slow");
		$(".webtxt").fadeOut("slow");
		$(".mashtxt").fadeOut("slow");
		$(".csgotxt").fadeOut("slow");
		$(".visiontxt").fadeOut("slow");
		$(".spoontxt").fadeOut("slow");
		$(".fishestxt").fadeOut("slow");
		$(".poesytxt").fadeOut("slow");
		$(".soapboxtxt").fadeOut("slow");
		$(".yogatxt").fadeOut("slow");
		$(".chesstxt").fadeOut("slow");
		$(".flytxt").fadeOut("slow");
		$(".cookingtxt").fadeOut("slow");
		$(".businesstxt").fadeOut("slow");
		$(".playtxt").fadeOut("slow");
		$(".twistertxt").fadeOut("slow");
		$(".frenchtxt").fadeOut("slow");
		$(".concordtxt").fadeOut("slow");
		$(".budhatxt").fadeOut("slow");
		$(".movietxt").fadeOut("slow");
		$(".shotguntxt").fadeOut("slow");
		$(".pixeltxt").fadeOut("slow");
		$(".marveltxt").fadeOut("slow");
		$(".pottxt").fadeOut("slow");
		$(".jamhamtxt").fadeOut("slow");
		$(".rjtxt").fadeOut("slow");
		$(".rangolitxt").fadeOut("slow");
		$(".indianatxt").fadeOut("slow");
		$(".masktxt").fadeOut("slow");
		$(".jingletxt").fadeOut("slow");
		$(".eurekatxt").fadeOut("slow");
	
	});

});



