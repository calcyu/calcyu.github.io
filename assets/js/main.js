---
layout: null
---

$(function() {
  var toc     = $('.toc-link'),
      sidebar = $('#sidebar'),
      main    = $('#main'),
      menu    = $('#menu'),
      posttoc = $('#post-toc-menu'),
      x1, y1;

  // run this function after pjax load.
  var afterPjax = function() {
    // open links in new tab.
    $('#main').find('a').filter(function() {
      return this.hostname != window.location.hostname;
    }).attr('target', '_blank');

    // generate toc
    var toc = $('#post-toc-ul');
    // Empty TOC and generate an entry for h1
    toc.empty().append('<li class="post-toc-li post-toc-h1"><a href="#post-title" class="js-anchor-link">' + $('#post-title').text() + '</a></li>');

    // Generate entries for h2 and h3
    $('.post').children('h2,h3').each(function() {
      // Generate random ID for each heading
      $(this).attr('id', function() {
        var ID = "", alphabet = "abcdefghijklmnopqrstuvwxyz";

        for(var i=0; i < 5; i++) {
          ID += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        return ID;
      });

      if ($(this).prop("tagName") == 'H2') {
        toc.append('<li class="post-toc-li post-toc-h2"><a href="#' + $(this).attr('id') + '" class="js-anchor-link">' + $(this).text() + '</a></li>');
      } else {
        toc.append('<li class="post-toc-li post-toc-h3"><a href="#' + $(this).attr('id') + '" class="js-anchor-link">' + $(this).text() + '</a></li>');
      }
    });

    // Smooth scrolling
    $('.js-anchor-link').on('click', function() {
      var target = $(this.hash);
      main.animate({scrollTop: target.offset().top + main.scrollTop() - 70}, 500);
    });

    // discus comment.
      if($("#disqus_thread").length>0){
        var ds_loaded = false;
        window.disqus_shortname = "{{ site.disqus.shortname }}";
        main.scroll(function(){
          var nScrollHight = $(this)[0].scrollHeight;
          var nScrollTop = $(this)[0].scrollTop;
          if(!ds_loaded && nScrollTop + main.height() >= nScrollHight - 100) {
            $.ajax({
              type: 'GET',
              url: 'http://' + disqus_shortname + '.disqus.com/embed.js',
              dataType: 'script',
              cache: true
            });
            ds_loaded = true;
          }
        });
      }
    {% endif %}
    // your scripts
  };
  afterPjax();


  // NProgress
  NProgress.configure({ showSpinner: false });

  // Pjax
  $(document).pjax('#sidebar-avatar, .toc-link, .next, .previous', '#main', {
    fragment: '#main',
    timeout: 3000
  });

  $(document).on({
    'pjax:click': function() {
      NProgress.start();
      main.removeClass('fadeIn');
    },
    'pjax:end': function() {
      afterPjax();
      NProgress.done();
      main.scrollTop(0).addClass('fadeIn');
      // only remove open in small screen
      if($(window).width() <= 1024) {
        menu.add(sidebar).add(main).removeClass('open');
      }
    }
  });


  // Tags Filter
  $('#sidebar-tags').on('click', '.sidebar-tag', function() {
    var filter = $(this).data('filter');
    toc.hide();
    if (filter === 'recent') {
      toc.slice(0, {{ site.recent_num }}).fadeIn(350);
    } else {
      $('.toc-link[data-tags~=' + filter + ']').fadeIn(350);
    }
    $(this).addClass('active').siblings().removeClass('active');
  });
  // Only show recent
  toc.hide();
  toc.slice(0, {{ site.recent_num }}).fadeIn(350);

  // Menu
  menu.on('click', function() {
    $(this).add(sidebar).add(menu).add(main).toggleClass('open');
  });

  // right toc
  posttoc.on('click', function() {
    $('#post-toc').toggleClass('open');
  });

  // Search
  //修改为 algolia搜索
  // $('#search-input').on('input', function(e){
  //   var blogs = $(".toc-link").filter(function() {
  //     var reg = new RegExp($('#search-input').val(), "i");
  //     return reg.test($(this).text());
  //   });
  //   toc.hide();
  //   blogs.fadeIn(350);
  // });
  // strip HTML tags + keep <em>, <p>, <b>, <i>, <u>, <strong>
  function stripTags(v) {
    return $('<textarea />').text(v).html()
      .replace(/&lt;(\/)?(em|p|b|i|u|strong)&gt;/g, '<$1$2>');
  }
  // handle attribute from tree
  function getStringAttributeFromObject(attr_string, hit) {
    var attr_array = attr_string.split(".");
    var attr = hit;
    $.each(attr_array, function(i) {
      attr = attr && attr[attr_array[i]];
    });
    if (!attr) {
      return false;
    }
    if (attr.value) {
      // we're on a highlighted form
      return attr.value;
    }
    if (Object.prototype.toString.call(attr) === '[object Array]') {
      var str = [];
      $.each(attr, function(i, e) {
        if (e && typeof e === 'string') {
          str.push(e);
        } else if (e && e.value) {
          str.push(e.value);
        } else if (e) {
          str.push(objToString(e));
        }
      });
      return str.join(', ');
    }
    if (typeof attr === 'object') {
      attr = objToString(attr);
    }
    return '' + attr;
  }

  var client = algoliasearch('Z8F4DOSV5P', 'ab55cb31bd8d064f57ea2aadf0081e84');
  var index = client.initIndex('geek5');
  $('#search-input').autocomplete({ hint: false, appendTo  :"#toc", openOnFocus:true, debug:false
    }, [
      {
          source: $.fn.autocomplete.sources.hits(index, { hitsPerPage: 5 }),
          displayKey: 'title',
          templates: {
              suggestion: function(suggestion) {
                  return suggestion._highlightResult.title.value;
              }
          }
      }
  ]).on('autocomplete:selected', function(event, suggestion, dataset) {
      if (stripTags('url') !== '') {
        var url = getStringAttributeFromObject('url', suggestion);
  
        $("#va").attr("href", url).click();
        // if (url) {
        //   location.href = url;
        // }
      }
  });

});
