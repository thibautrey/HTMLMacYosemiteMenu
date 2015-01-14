var listOfContextualMenus = Array();

function ContextualMenu(idObject){
	var myself = this;
    this.items = Array();
    this.id = idObject;
    this.acceptableSubMenuStack = Array(); // This is the list of parent item that keep the submenus opened

    this.addMenuItem = function(item){
	    this.items.push(item);
    };
    
    this.removeContextualMenu = function(){
	    $('#'+this.id).remove();
	    $(this).trigger('menuDismissed');
    }
    
    this.menuTrigger = function(event, element, triggerHandler){
    	$(document).on(event, element, function(event){
	    	 myself.removeContextualMenu();
			 triggerHandler($(event.originalEvent.target));
			 var menuNode = $('<div class="popupMenu" id="' + myself.id + '"><div class="popupMenuBackground"></div><ul></ul></div>');
			 console.log(event);
			 menuNode.css('left', event.pageX);
			 menuNode.css('top', event.pageY);
		
			 for(var i = 0; i < myself.items.length; i++){
				 var currentMenuItem = myself.items[i];
				 var nodeString = '<li id="' + currentMenuItem.id + '" data-parent="top">';
				 nodeString += currentMenuItem.title;
				 if(currentMenuItem.items.length){
				 	nodeString += '<span class="pull-right subMenuCaret">&#10095;</span>';
				 }
				 nodeString += '</li>';
				 menuNode.append($(nodeString)); 	
			 }
			 
			 $('body').append(menuNode);
    	});
    }
    
    this.searchForItemInHierarchy = function(id){
	   return subMenuItem(this.items, id);
    }
    
    function subMenuItem(subMenuItems, id) {
	    if (subMenuItems) {
	        for (var i = 0; i < subMenuItems.length; i++) {
	            if (subMenuItems[i].id == id) {
	                return subMenuItems[i];
	            }
	            var found = subMenuItem(subMenuItems[i].items, id);
	            if (found) return found;
	        }
	    }
	};
    
    $(document).on('mouseover', "#"+this.id+' li', function(event){
	    var idMenu = $(this).attr('id');
	    var item = myself.searchForItemInHierarchy(idMenu);
	    
	    if($(this).attr('data-parent') != "top"){ // If it is not the top menu
		    if(myself.acceptableSubMenuStack.indexOf($(this).attr('data-parent')) != -1){
			    myself.acceptableSubMenuStack.push(item.id);
		    }else{
		    	this.acceptableSubMenuStack = Array();
			    $('#'+myself.id+' .submenu').remove();
		    }
	    }else{
	    	$('#'+myself.id+' .submenu').remove();
		    myself.acceptableSubMenuStack = Array();
		    myself.acceptableSubMenuStack.push(item.id);
	    }
	    
	    // Remove all the children
	    $('#'+myself.id+' li[data-parent=' + idMenu + ']').remove();
	    
	    $('#'+myself.id+' .submenu').each(function(){
		    if(typeof($('#'+$(this).attr('data-parent'))) == "undefined"){
			    $(this).remove();
		    }
	    });
	    
	    $('#'+myself.id+' ul').each(function(){
		    if(!$(this).find('li').length){
			    $(this).remove();
		    }
	    });
	    
    	if(item.items.length){
	    	var subMenu = $('<div class="popupMenu submenu" id="' + item.id + '"><div class="popupMenuBackground"></div><ul></ul></div>');
	    		subMenu.css('left', $(this)[0].offsetWidth+'px');
				subMenu.css('top', $(this)[0].offsetTop+'px');
				
				for(var i = 0; i < item.items.length; i++){
					 var currentMenuItem = item.items[i];
					 var nodeString = '<li id="' + currentMenuItem.id + '" data-parent="' + item.id + '">';
					 	 nodeString += currentMenuItem.title;
					 if(currentMenuItem.items.length){
					 	nodeString += '<span class="pull-right subMenuCaret">&#10095;</span>';
					 }
					 	 nodeString += '</li>';
					 subMenu.append($(nodeString));
				}
				 
			    $(this).parent().append(subMenu);
			    
			    /*var referenceSize = $("#"+myself.id+" li").first().height();
			    for(var i = 0; i < item.items.length; i++){
			    	var currentSubmenu = $('#'+item.items[i].id);
			    	for(var i = 0; i < 100; i++){
			    		if(currentSubmenu.height()>referenceSize){
				    		$(".submenu").last().width(($(".submenu").last().width()+10));
			    		}else{
				    		i = 100;
			    		}
			    	}		
			    }*/
    	}
    });
    
    $(document).on('click', "#"+this.id+' li', function(event){
    	var idMenu = $(this).attr('id');
    	$(myself).trigger('menuClick', [idMenu]);
    });
    
    listOfContextualMenus.push(this);
};

function MenuItem(id, title){
	this.items = Array();
	this.title = title;
	this.id = id;
	
	this.addSubMenuItem = function(item){
	    this.items.push(item);
    };
};