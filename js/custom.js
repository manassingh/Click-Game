$(document).ready(function(){
/*====model====*/
var model={
	mainCount:0,
	isStarted:false,
	timeLeft:15,
	clickLeft:10,
	level:1,
	firstTarget:10,
	colorSet : ["#FF5722","#FFFF00","#76FF03","#18FFFF","#FFEB3B","#FFA726","#9C27B0","#03A9F4","#FFEB3B",
	"#536DFE","#5E35B1","#E040FB","#FF4081","#B71C1C","#880E4F","#4A148C","#0D47A1","#1A237E","#311B92",
	"#004D40","#006064","#01579B","#1B5E20","#E65100","#212121"]
}

/*====spider====*/
var spider={
	init: function(){
		view.init();
	},
	timeLeft: function(fail){
		if(model.timeLeft>0){
			model.timeLeft--;
		}else{
			spider.fail(fail);
		}
		
	},
	fail: function(fail){
		clearInterval(startTimer);
		fail.style.display='block';
	},
	startOver: function(){
		location.reload();
	},
	pass: function(info,startBt){
		clearInterval(startTimer);
		info.style.display='block';
		startBt.style.display='block';
		this.nextLevel();

	},
	nextLevel: function(){
		model.level=model.level+1;
		model.clickLeft=model.firstTarget + (10*model.level);
		model.timeLeft=15;
		model.isStarted=false;
		view.render();
		view.renderInfo();
	},
	start: function(info,startBt){
		info.style.display='none';
		startBt.style.display='none';
	},
	continue: function(fail){
		fail.style.display='none';
		if(model.level!=1){
			model.clickLeft=model.firstTarget + (10*model.level);
		}else{
			model.clickLeft=model.firstTarget;
		}
		
		model.timeLeft=15;
		model.isStarted=false;
		view.render();
		view.renderInfo();
	},
	update: function(info,startBt,fail){
		if(!model.isStarted){
			model.isStarted=true;
			startTimer = setInterval(function(){ 
				spider.timeLeft(fail);
				view.render();
			}, 1000);
		}
		if (model.clickLeft>0) {
			model.clickLeft--;
			view.render();
			var ripple = document.createElement('div');
			var xCord = Math.floor(Math.random() * ($(window).width()));
	      	var yCord = Math.floor(Math.random() * ($(window).height()));

	      	var randColor = model.colorSet[Math.floor(Math.random() * model.colorSet.length)];
	      	var randColor2 = model.colorSet[Math.floor(Math.random() * model.colorSet.length)];
	      	
	      
	      	$(ripple).addClass('ripple-effect');
	      	$(ripple).css({
					          top:  yCord,
					          left: xCord,
					          background: randColor
					        }) 
	        		 .prependTo('body');

	         window.setTimeout(function(){
		        $(ripple).remove();
		      }, 1200);
		}else{
			spider.pass(info,startBt);
		}
		
	}
}

/*====view====*/
var view={
	init: function() {
		this.mainBt=document.getElementById('clickBt');

		this.time=document.getElementById('timeLeft');
		this.clickCount=document.getElementById('clickCount');

		this.info=document.getElementById('info');
		this.level=document.getElementById('level');
		this.task=document.getElementById('task');
		this.startBt=document.getElementById('start');

		this.fail=document.getElementById('fail');
		this.failBt=document.getElementById('failBt');

		this.replayLevel=document.getElementById('replayLevel');

		
		this.mainBt.addEventListener('click',function(){
			spider.update(info,view.startBt,fail);
		});

		this.startBt.addEventListener('click',function(){
			spider.start(info,this);
		});

		this.failBt.addEventListener('click', function(){
			spider.startOver();
		});

		this.replayLevel.addEventListener('click', function(){
			spider.continue(fail);
		});

		this.render();
		this.renderInfo();
	},
	render: function(){
		this.time.innerHTML=model.timeLeft;
		this.clickCount.innerHTML=model.clickLeft;
	},
	renderInfo: function(){
		this.level.innerHTML=model.level;
		this.task.innerHTML=model.clickLeft + ' Clicks is 15 Sec!'
	}
}

spider.init();
});
