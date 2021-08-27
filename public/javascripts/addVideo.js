$(document).ready(function () {
    var API_KEY = "";
    var search = "";
    var link = "";
    var id = "";
    

    // Youtube Search
    $("#searchForm").submit(function (e) {
      e.preventDefault();
  
      search = $("#search").val();

      API_KEY = "AIzaSyCTR7imCsmj5baanJ3y8TnwvbHxtxqI8aQ";
  
      var url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${search}&type=video`;
  
      $.ajax({
        method: "GET",
        url: url,
        beforeSend: function () {
          $("#btn").attr("disabled", true);
          $("#results").empty();
        },
        success: function (data) {
          console.log(data);
          $("#btn").attr("disabled", false);
          displayVideos(data);
        },
      });
    });

    function displayVideos(data) {
      $("#search").val("");
      $("#link").val("");
      var videoData = "";
      var playlistId = document.getElementById("playlistId").value;
      var owner = document.getElementById("owner").value;

      $("#table").show();
      // for (var i = 0; i < 10; i++) {
        data.items.forEach((item) => {
          videoData = `
                        <tr>
                        <td>
                        <a target="_blank" href="https://www.youtube.com/watch?v=${item.id.videoId}">
                        ${item.snippet.title}</td>
                        <td>
                        <a target="_blank" href="https://www.youtube.com/channel/${item.snippet.channelId}">${item.snippet.channelTitle}</a>
                        </td>
                        <td>
                          <form action="/submit-video" method="POST">
                            <input hidden readonly type="text" id="youtube_link_id" name="youtube_link_id" value=${item.id.videoId}><br>
                            <input hidden readonly type="text" id="video_title" name="video_title" value="${item.snippet.title}"><br>
                            <input hidden readonly type="text" id="playlist_id" name="playlist_id" value=` + playlistId+ `><br>
                            <input hidden readonly type="text" id="owner" name="owner" value=` + owner+ `><br>

                            <input type="submit" value="Add Video">
                          </form> 
                        </td>
                        </tr>
                        `;
    
          $("#results").append(videoData);
        });
      // }
    }

    // Link Search 
    $("#linkForm").submit(function (e) {
      e.preventDefault();
  
      API_KEY = "AIzaSyCTR7imCsmj5baanJ3y8TnwvbHxtxqI8aQ";

      link = $("#link").val();
      // console.log(link);
      id = link.match("v=([a-zA-Z0-9_-]+)&?")[1];
      console.log(id);

      var url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`
  
      $.ajax({
        method: "GET",
        url: url,
        beforeSend: function () {
          $("#btn").attr("disabled", true);
          $("#results").empty();
        },
        success: function (data) {
          $("#btn").attr("disabled", false);
          displayVideo(data);
        },
      });
    });

    function displayVideo(data) {
      $("#search").val("");
      $("#link").val("");
      var videoData = "";
      var playlistId = document.getElementById("playlistId").value;
      var owner = document.getElementById("owner").value;

  
      $("#table").show();
        data.items.forEach((item) => {
          videoData = `
                        <tr>
                        <td>
                        <a target="_blank" href="https://www.youtube.com/watch?v=${id}">
                        ${item.snippet.title}</td>
                        <td>
                        <a target="_blank" href="https://www.youtube.com/channel/${item.snippet.channelId}">${item.snippet.channelTitle}</a>
                        </td>
                        <td>
                        <form action="/submit-video" method="POST">
                          <input hidden readonly type="text" id="youtube_link_id" name="youtube_link_id" value=${id}><br>
                          <input hidden readonly type="text" id="video_title" name="video_title" value="${item.snippet.title}"><br>
                          <input hidden readonly type="text" id="playlist_id" name="playlist_id" value=` + playlistId + `><br>
                          <input hidden readonly type="text" id="owner" name="owner" value=` + owner+ `><br>

                          <input type="submit" value="Add Video">
                        </form> 
                        </td>
                        </tr>
                        `;
    
          $("#results").append(videoData);
        });
    }


  });