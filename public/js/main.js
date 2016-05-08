$(document).submit('#upload-form', function(e) {
    e.preventDefault();
    uploadIt();
    function uploadIt() {
     var formData = new FormData();
     formData.append('file', $('.file')[0].files[0]);
      if(formData) {
    	$.ajax({
		type: 'POST',
		data: formData,
		contentType: false,
        processData: false,
        url: '/',						
        success: function(data) {
            console.log(data);
            var loadFile = function() {
             return "<img src=" + URL.createObjectURL($('.file')[0].files[0]) + ">";
            };
            var imageOrNot = data.mimetype.split('/')[0];
            var printItToPage = '<div class="row">\n  <div class=" col-xs-12">\n    <div class="thumbnail">\n    ' + (imageOrNot === 'image' ? loadFile() : '') + '\n      <div class="caption">\n        <p>File Name: ' + data.originalname + '</p>\n        <p>Size(bytes): ' + data.size + '</p>\n        <p>File Type: ' + data.mimetype + '</p>\n        <p>Encoding: ' + data.encoding + '</p>\n      </div>\n    </div>\n  </div>\n</div>';
                                
            $('#data-here').html(printItToPage);
            alert('File Name: ' + data.originalname+', ' +'File Size: '+ data.size);
        }
        });
      }
     };
});