require(['gitbook', 'jQuery'], function(gitbook, $) {
  var TOGGLE_CLASSNAME = 'expanded',
      CHAPTER = '.chapter',
      ARTICLES = '.articles',
      TRIGGER_TEMPLATE = '<i class="exc-trigger fa"></i>',
      LS_NAMESPACE = 'expChapters';
  
  function createNavList(){

    var navList ='';
    var baseURL = location.pathname;

    function toNum(str){
      return +str.slice(-1)
    }

    function createHTML(arr,closeTag){

      if(arr.length){

        navList+='<ul class="articles">';

        $.each(arr,function(i,ele){

            if(ele.children.length){
              navList+='<li class="chapter add" data-sign="'+ele.id+'"><a href="'+baseURL+'#'+ele.id+'">'+ele.text+'</a>';
            }else{
              navList+='<li class="chapter add" data-sign="'+ele.id+'"><a href="'+baseURL+'#'+ele.id+'">'+ele.text+'</a></li>';
            }
            
            if(ele.children.length){
              createHTML(ele.children,'</li>')
            }
        })

        var closeTag = closeTag? closeTag :"";
        navList +='</ul>'+closeTag;
      }
    }


    function insert(arr,ele){

      if(arr.length){
        var i = arr.length-1;
  
        var dis = ele.index - arr[i].index;

        if(dis>0){
          insert(arr[i].children,ele);
        }else{
          arr.push(ele);
        }   
      }else{
        arr.push(ele);
      }

    }

    var arr = [];
    $('section :header').each(function(i,ele){
      
      if(i){  
        
        var jsonEl = {
          id:ele.id,
          text:$.trim($(ele).text()),
          index:toNum(ele.tagName),
          children:[]
        };

        insert(arr,jsonEl);

      }
      
    })


    createHTML(arr);

    $('.chapter.active').append(navList);

    $('.add').each(function(){
      $(this).click(function(e){
                
        $('.active').removeClass('active');
        $(this).addClass('active');
        expand($(this));
        console.log('expandexpandexpandexpand')

        e.stopPropagation();
        console.log('thishtiioooo',$(this))
      })
    })

    

    $('.summary').children().each(function(i,ele){

      var link = $(this).find('a').eq(0);
      var hash = link.text().trim().toLowerCase();
      var url = link.attr('href');
      if(i){
        $(this).append('<ul class="articles"><li></li></ul>');
      }
      
      link.attr('href',url+'#'+hash);

      $(this).click(function(e){
        if($(this).attr('data-level')!='1.3'){
          collapse($(".chapter[data-level='1.3']"));
        }
        $('.active').removeClass('active');     
        $(this).addClass('active');
      });

    })

  }

  
  var toggle = function ($chapter) {
    if ($chapter.hasClass('expanded')) {
      collapse($chapter);
    } else {
      expand($chapter);
    }
  }
  var collapse = function ($chapter) {
    if ($chapter.length && $chapter.hasClass(TOGGLE_CLASSNAME)) {
      $chapter.removeClass(TOGGLE_CLASSNAME);
      lsItem($chapter);
    }
  }
  var expand = function ($chapter) {
    if ($chapter.length && !$chapter.hasClass(TOGGLE_CLASSNAME)) {
      $chapter.addClass(TOGGLE_CLASSNAME);
      lsItem($chapter);
    }
  }
  var lsItem = function () {
    var map = JSON.parse(localStorage.getItem(LS_NAMESPACE)) || {}
    if (arguments.length) {
      var $chapters = arguments[0];
      $chapters.each(function (index, element) {
        var level = $(this).data('level');
        var value = $(this).hasClass(TOGGLE_CLASSNAME);
        map[level] = value;
      })
      localStorage.setItem(LS_NAMESPACE, JSON.stringify(map));
    } else {
      return $(CHAPTER).map(function(index, element){
        if (map[$(this).data('level')]) {
          return this;
        }
      })
    }
  }


  var init = function () {
    
    createNavList();

    // adding the trigger element to each ARTICLES parent and binding the event
    $(ARTICLES)
      .parent(CHAPTER)
      .children('a')
      .append(
        $(TRIGGER_TEMPLATE)
          .on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggle($(e.target).closest(CHAPTER));
          })
      );
    expand(lsItem());
    //expand current selected chapter with it's parents
    var activeChapter = $(CHAPTER + '.active');
    expand(activeChapter);
    expand(activeChapter.parents(CHAPTER));

  } 

  //初始化页面导航列表结构
  createNavList();
  
  //展开当前页面列表
  expand(lsItem());

  // var path = ['quick_view','lan-hu-shi-pin-jiao-cheng','lan-hu-gong-neng-gai-lan','lan-hu-gong-neng-gai-lan']
  
  if(location.hash){
  
    var hash = decodeURIComponent(location.hash.slice(1));
    var hashChapter =$(".chapter[data-sign='"+hash+"']");
    

    console.log(hashChapter)
    setTimeout(function(){
      location.hash = hash;
      hashChapter.addClass('active')
    },300)

  }
  


  gitbook.events.bind('page.change', function() {
    init(); 
  }); 
});
