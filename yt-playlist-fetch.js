function escapeHTML(text) {
    return $('<div/>').text(text).html();
}

$('#download').hide();
function viewPlaylist(playlist) {
    var api = 'http://gdata.youtube.com/feeds/api/playlists/';
    var any = 'http://anyorigin.com/get?callback=?&url=';
    $.getJSON(any + encodeURIComponent(api + playlist), function(json) {
        var $script = $('#script');
        var $xml = $($.parseXML(json.contents));
        var title = $xml.find('title').first().text();
        var name = $xml.find('name').first().text();
        $script.text('#!/bin/bash\n\n')
            .append('# ' + escapeHTML(title))
            .append(' (' + playlist + ')\n')
            .append('# ' + escapeHTML(name) + '\n\n')
            .append('xargs -n1 -P4 youtube-dl -t &lt;&lt;EOF\n');
        $xml.find('player, media\\:player').each(function() {
            $script.append($(this).attr('url').match(/(^.+)&/)[1] + '\n');
        });
        $script.append('EOF');
        var uri = "data:application/octet-stream," +
                encodeURIComponent($script.text());
        $('#download').attr('href', uri).show();
    });
}

var playlist = location.hash.slice(1);
$('#playlist').val(playlist);

$('form').bind('submit', function() {
    var playlist = $('#playlist').val();
    location.hash = playlist;
    viewPlaylist(playlist);
    return false;
});

if (playlist) {
    viewPlaylist(playlist);
} else {
    $('#script').append('# Select a playlist.');
}
