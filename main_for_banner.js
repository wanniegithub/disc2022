var banner = document.getElementById('banner'),			// 배너 본체
	img = banner.getElementsByTagName('img'),			// 스프라이트 이미지
	toggle = document.getElementById('toggle'),			// 배너 토글 버튼
	sound_btn = document.getElementById('sound_btn');	// 사운드 토글 버튼

// 배너의 높이값 변수
var banner_height = getComputedStyle(banner).height;
// console.log(banner_height);
var cast = []; // 풍선 객체

// 풍선 객체 생성 함수
function set_balloon(num){
	// 풍선의 속성값을 랜덤으로 생성
	var x = Math.floor(Math.random() * (500 - 10) + 10),
		y = Math.floor(Math.random() * (400 - 120) + 120),
		size = Math.floor(Math.random() * (200 - 100) + 100),
		angle = Math.floor(Math.random() * (360 - 0) + 0),
		speed = Math.random() * (2 - 0) + 0;

	// 풍선 객체
	cast[num] = {
	    x: x,			// x좌표
	    y: -y,			// y좌표
	    size: size,		// 사이즈
	    angle: angle,	// angle
	    speed: speed	// speed
	};		
}

// 풍선 객체 초기화 함수
function ball_init(){
	for(var i = 0; i < img.length; i++){
		// 풍선 객체들의 속성 초기화
		set_balloon(i);
		img[i].style.left = '-9999px';	// 풍선의 x 좌표
	    img[i].style.top = '-9999px';	// 풍선의 y 좌표
	}
}

// 풍선 애니메이션 함수
function animate_balloon(){
	for(var i = 0; i < img.length; i++){
		// 벌룬 속성 변경
	    img[i].style.left = cast[i].x + 'px';	// x 좌표
	    img[i].style.top = cast[i].y + 'px';	// y 좌표
	    img[i].style.transform = 'rotate(' + cast[i].angle + 'deg)';	// 회전

	    // 벌룬이 화면 안에 있으면
	    if(cast[i].y < parseInt(banner_height)){
	      cast[i].y += 1 + cast[i].speed;
	      cast[i].angle += cast[i].speed;
	    } else{	// 벌룬이 밑으로 나가면 
	    	set_balloon(i);
	    }
    }	// end for
}	// end move_balloon()

function bgm_init(){
	var bgm = new Audio();	// 오디오 객체를 생성
	bgm.src = 'images/bgm.mp3';
	bgm.loop = true;
	document.body.appendChild(bgm);	// 문서에 오디오 객체 추가
}


/* ------------------------------------------------------------------------ */
// 메인
ball_init();
setInterval(function(){ animate_balloon(); }, 1000/30);	
bgm_init();


/* ------------------------------------------------------------------------ */
// 사운드 버튼 이벤트 핸들러
sound_btn.onclick = function(event){
	var attr = sound_btn.getAttribute('class');			// 사운드버튼의 class 속성
	var bgm = document.getElementsByTagName('audio');	// audio 객체

	if(attr == 'active'){
		// 사운드 off
		sound_btn.removeAttribute('class');
		sound_btn.setAttribute('src', 'images/sound_off.png');	// 버튼 이미지 교체
		bgm[0].pause();
	} else{
		// 사운드 on
		sound_btn.setAttribute('class', 'active');
		sound_btn.setAttribute('src', 'images/sound_on.png');
		bgm[0].play();
	}
	event.stopPropagation();
}

// 배너 열고닫기 버튼 이벤트 핸들러
toggle.onclick = function(){
	var attr = banner.getAttribute('class');

	if(attr == 'active'){
		// 배너 닫기
		banner.removeAttribute('class');
		toggle.innerHTML = '배너 열기';
		return false;
	} else{
		// 배너 열기
		banner.setAttribute('class', 'active');
		toggle.innerHTML = '배너 닫기';
		return false;
	}
};

//	배너 링크 처리
banner.onclick = function(){
	window.open('main.html', '_blank');
}