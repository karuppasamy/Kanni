(function () {

  
  // add the indic script plugin to ckeditor
  CKEDITOR.plugins.add('kanni', {
    
    init: function(editor) {
      
      editor.addCommand( 'kanni_toggle', {
				modes : { wysiwyg:1 },
				editorFocus : false,
				exec : function( editor ) { 
          Kanni.toggle(); 
        }
			});
      
			var keystrokes = editor.keystrokeHandler.keystrokes;
			keystrokes[ Kanni.switchkey ] = 'kanni_toggle';
      
      // allow IME typing in source textarea
      editor.on( 'mode', function() {
        if (editor.mode == 'source' ) {
          var textarea = editor.textarea.$;
          $(textarea).bind('keypress', Kanni.keyPressHandler);
        }
      });
      
      editor.on('focus', function( event ) {
        Kanni.showLanguageSwitcher(event);
      });
      
      editor.on('blur', function( event ) {
        Kanni.hideLanguageSwitcher(event);
      });
      
      editor.on( 'contentDom', function() {
        
        /* editor.document.$.addEventListener('textInput', function( e ) {
          //alert('heloo, I am HTML 5');
        }, true);*/
        
        
        editor.document.on( 'keypress', function( event ) { //$(editor.element).bind('keypress', function( e ) { //
          
          return Kanni.CKEditorKeyPressHandler(event, editor);
          
        });
        
      });
      
    },    
  });

})();

