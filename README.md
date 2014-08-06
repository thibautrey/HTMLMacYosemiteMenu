HTMLMacYosemiteMenu
===================

This is an easy to use contextual menu for website. It uses javascript to trigger events allowing you to do something specific at single menu item.

  <hr/>

The library is composed of 2 files :
 The javascript that is ready to work as it is so you don't need to modify something. But if you do please make a pull request.
The css is baically what makes it looks like a Yosemite-like menu

  <hr/>

To create the menu you have to use these two classes :

  <p><b>ContextualMenu</b> : This the actual menu. It contains all the menu items you want to display and defines the position from which every over elements are gonna be displayed on the screen</p>
  <p>To create a new ContextualMenu</p>
  ```
  var myMenu = new ContextualMenu("menuID");
  ```
 
  <p><b>MenuItem</b> : This class is used to create a menu item. A menu item can contains one or more menu items and so on in order to create a hierarchy of menus</p> 
  <p>To create a new MenuItem</p>
  ```  
  var myMenuItem = new MenuItem("menuItemID", "Menu item title");
  ```
  
  <hr/>
  
  <h3>Create a hierarchy</h3>
  
  <h4>Add a new item to the menu</h4>
  
  To add a new MenuItem to the menu you use the method <b>addMenuItem</b> of an object of class <b>ContextualMenu</b>
  
  ```  
  addMenuItem(item);
  ```
  
  Example : 
  
  ```  
  var myMenu = new ContextualMenu("menuID");
  var myMenuItem = new MenuItem("menuItemID", "Menu item title");
  
  myMenu.addMenuItem(myMenuItem);
  ```
  
  <h4>Add a submenu to an existing MenuItem</h4>
  
  If your menu item should contains more options you can add one or more MenuItem(s) to an existing <b>MenuItem</b> using the method addSubMenuItem of an object of type <b>MenuItem</b>
  
  ```
  addSubMenuItem(item);
  ```
  
  Example : 
  
  ```
  var myMenu = new ContextualMenu("menuID");
  var myMenuItem = new MenuItem("menuItemID", "Menu item title");
  var mySubMenuItem = new MenuItem("submenuItemID", "Submenu title");
  
  myMenuItem.addSubMenuItem(mySubMenuItem);
  
  myMenu.addMenuItem(myMenuItem);
  ```
  
  <hr/>
  
  There is a few methods that you can use to interact with the menu : 
  
  <h3>Trigger Menu</h3>
  
  To display the menu you have to link it to an event and a DOM element. You have to use the method <b>menuTrigger</b> to do so.
  
  ```
  menuTrigger(event, element, triggerHandler);
  ```
  
  <b>Event</b> This is the event that triggers the menu. It can be any jQuery event you want : click, mouseover or contextmenu (to trigger when you right-click on the element)
  
  The second parameter is the <b>element</b> you want to link the menu to. If you want to link by id just set #myElementId, or by class use .myElementClass
  
  The last parameter <b>triggerHandler</b> is the block that is gonna be called when the menu displays. You can set a function name or put an anonymous block. The element that targeted the menu will be returned as the first parameter.
  
  <h3>Remove menu</h3>
  
  By default the menu only dismisses when you click on of the menu item in order to give you a total control of the behavior. If you want to dismiss the menu manually with another event you can use the <b>removeContextualMenu</b> method.
  
  ```
  removeContextualMenu();
  ```
  
  Example : 
  
  ```
  $(document).on('click', '#close', function(){
    myMenu.removeContextualMenu();
  });
  ```

  <hr/>
  
  <h3>Examples :</h3>


  Create a simple menu
  ```
  HTML : <button class="btn btn-default" id="displayMenu">Display menu</button>
  
  var myMenu = new ContextualMenu();
  var myMenuItem1 = new MenuItem("menuItem1", "Menu 1");
  var myMenuItem2 = new MenuItem("menuItem2", "Menu 2");
  myMenu.addMenuItem(myMenuItem1);
  myMenu.addMenuItem(myMenuItem2);
  
  myMenu.menuTrigger('click', '#displayMenu', function(target){
    var myDisplayMenuButton = target;
  });
  ```  
  
  ![Alt text](http://imagizer.imageshack.us/v2/280x200q90/674/JCTDEo.png "Simple contextual menu")
  
  

        
