const parts = document.getElementById("selec--tion"),
    imgs = document.querySelector(".js-img-all"),
    subTitle = document.querySelector(".sub--title"),
    modalBack = document.querySelector(".js-modal"),
    modal = document.querySelector(".js-data"),
    more = document.querySelector(".js-more"),
    imgCache = document.querySelector(".js-img-cache"),
    body = document.querySelector("body"),
    cam = document.querySelector(".camera--icon"),
    camArea = document.querySelector(".camera--area"),
    container = document.querySelector(".con--tainer"),
    partName = new Set(edu.map(d=> d.part)),//셀렉트에 붙여질 목록 중복제거
    partList = Array.from(partName);


let constraints = { audio: false, video: { facingMode: { exact: "environment" } } };


// 셀렉트에 목록 출력
partList.forEach(v => {
    const option = `<option value="${v}">${v}</option>`;
    parts.insertAdjacentHTML("beforeend", option);
});

// 이미지를 클릭하면 세부 내용표시
imgs.addEventListener("click", (e) => {
    if (e.target!= imgs){
        const selRole = edu.filter(d => d.role == e.target.dataset.role);
        replacecImg(selRole[0], e.target);
    }
}); 


// 셀렉트 박스 선택에 따라 컨텐츠 변경
parts.addEventListener("change", (e) => {
    let selectedValue = e.target.value;
    deleteTags(".directions");
    deleteTags(".edu-pics");
    deleteTags(".sub--ject");
    body.classList.remove("entrance");

    switch (selectedValue) {
        case partList[0]:

            // 서브타이틀 - 스탠다드 구성 설명 데이터
            let subTitleGroup = edu.filter(d =>d.part == selectedValue && d.role == 2);
            // 서브타이틀 버튼 생성 (배열, 위치, 클래스)
            createBtn(subTitleGroup, subTitle, "sub--ject edu-btn");

            // 수업작 이미지 
            const comp = edu.filter(d => d.part == selectedValue && d.role == 0);
            imgListUp(0, comp[0].img, imgs);
            imgPreLoad(comp[0].decodeImg, imgCache)
            break;
        
        case partList[1]:
            //주제 연출          
            const direction = edu.filter(d => d.part == selectedValue);
            createTab(direction, subTitle, "sub--ject tab-ds font16")
            const tabs = document.querySelectorAll(".tab-ds");

            // 주제연출 부분에서 조형성부터 노출
            const filteredTheme = edu.filter(d => d.themeNum == 0);
            constentDirection(tabs[0], 0, filteredTheme[0]);
            break;

        default :
            body.classList.add("entrance");
            break;
    }
});

// 선택한 버튼,탭에 따라 세부 컨텐츠 출력
subTitle.addEventListener("click", (e) =>{
    selectedValue = parts.options[parts.selectedIndex].value;

    // 배경이 아닌 버튼을 눌렀다면
    if(e.target != subTitle) {
        const selected = e.target;

        // 누른 버튼이 어디 파트에 속했냐에 따라 다른 내용 출력
        switch (selectedValue) {
            case partList[0]:// 서브타이틀 버튼 누르면 모달창 띄우고 내용 출력
                body.classList.add("of-hidden");
                contentComposition(selected);
                break;

            case partList[1]:// 서브탭 누르면 내용 변경
                const themeNum = selected.dataset.num;

                const tabs = document.querySelectorAll(".tab-ds");
                tabs.forEach( d=> d.classList.remove("tab-s"));

                const filteredTheme = edu.filter(d => d.themeNum == themeNum);
                constentDirection(selected, themeNum, filteredTheme[0]);
        }
    } 
});





// 주제연출 내용 생성
function constentDirection(sel, themeNum, data){
    // 선택한 탭의 클래스명 토글
    if (themeNum == 0){
        sel.classList.toggle("tab-s")
    }else if(themeNum == 1){
        sel.classList.toggle("tab-s")
    }
    // 탭변경시 기존 내용 지우기
    deleteTags(".directions");
    deleteTags(".edu-pics");

    // 설명
    contentsDiv =
    `<div class="directions"> 
    <img style="width:250px;" src="${data.defineImg}"/>
    <br>|<br>
    <span class ="tag fontH font16">${data.define}</span>
    <br>
    |
    <div class="fontN font16 textM">${data.explain}</div>
    </div>`;
    container.insertAdjacentHTML("afterbegin", contentsDiv);

    // 이미지
    const comp = edu.filter(d => d.themeNum == themeNum && d.role == 4);
    imgListUp(4, comp[0].img, imgs);
    imgPreLoad(comp[0].decodeImg, imgCache)
}


function contentComposition(selected){
    
    // 구성 자료 필터링
    const comp = edu.filter(d => d.id == selected.dataset.id);
    // 클래스명(배경색) 모아 배열로 만들기
    const data = edu.filter(d => d.part == selected.dataset.part);
    const colorList = data.map(d => d.color);
    
    const content =
    `<div class="edu-explain">
    <span class="modal-close">×</span>
    <div class="text-head fontH">${comp[0].name}</div>
    <hr class="whiteHr">
    <div class="text-head fontN font16">${comp[0].explain}</div>

    <div class="exp-pic-big"
    style="background-image:url('${comp[0].img}"');"></div>
    </div>`;        

    modalBack.classList.toggle("view");
    // 모달배경 클래스(배경색) 전부 지우고
    colorList.forEach(v => modalBack.classList.remove(v) );
    // 모달배경 색채 클래스(배경색) 1개 추가
    modalBack.classList.add(comp[0].color);
    // 모달 주요 내용 출력
    modal.insertAdjacentHTML("afterbegin", content);
    // 모달 보조 내용 출력
    comp[0].decodeImg.forEach(d => {
        const imgDiv =
        `<img class="exp-pic" src="${d}"/>`;
            more.insertAdjacentHTML("beforeend", imgDiv);
    });

}
camArea.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    const closeBtn = document.querySelector(".camera-close");

    if (e.target == closeBtn){
        deleteTags(".camera--set");
        modalBack.classList.toggle("view");
        body.classList.remove("of-hidden");
    }
});
//카메라 화면 내용
cam.addEventListener("click", (e) => {
    body.classList.add("of-hidden");
    modalBack.classList.toggle("view");
    modalBack.classList.add("comp-bal");
    const camDiv =
    `<div class="camera--set of-hidden">
    <div class="camera-close">×</div>
    <video id="camera--view" autoplay playsinline></video>
    <div class="overlapping"></div>
    <div class="overlapping"></div>
    <div class="camera-back"></div>
    </div>`;
    
    camArea.insertAdjacentHTML("beforeend", camDiv);
    const cameraView = document.querySelector("#camera--view");
    
    if(document.readyState === 'complete'){
        cameraStart(cameraView);
    }
});

// 모달창 닫기
modalBack.addEventListener("click",() => {
    deleteTags(".camera--set");
    deleteTags(".edu-explain");
    deleteTags(".exp-pic");
    modalBack.classList.toggle("view");
    body.classList.remove("of-hidden");
});


// 이미지 바꾸기
function replacecImg(arr, target) {
    const selectOne = target;
    const selIndex = selectOne.dataset.index;
    const imgStyle = selectOne.style.backgroundImage;

    const original = `url("${arr.img[selIndex]}")`;
    const replace = `url("${arr.decodeImg[selIndex]}")`;

    switch (imgStyle) {
        case original :
            selectOne.style.backgroundImage = replace;
            break;
        case replace :
            selectOne.style.backgroundImage = original;
            break;
    }
}

// 이미지 생성
function imgListUp(role, arr, pos) {
    arr.forEach((v,i) => {
        const imgDiv =
        `<div class="edu-pics">
        <div class="edu-pic" data-role="${role}" data-index="${i}"
        style="background-image:url('${v}');"></div></div>`
        pos.insertAdjacentHTML("beforeend", imgDiv);
    });
}
// 캐시 이미지 생성
function imgPreLoad(arr, pos){
    arr.forEach((v,i) => {
        const preLoad =
        `<img class="edu-pics" src="${arr[i]}"/>`
        pos.insertAdjacentHTML("beforeend", preLoad);
    });
}

// 버튼 생성
function createBtn(arr, pos, className) {
    arr.forEach(v => {
        const btnDiv =
        `<button class="${className} ${v.color}"
        data-id="${v.id}" data-part="${v.part}">
        ${v.name}</button>`;
        pos.insertAdjacentHTML("beforeend", btnDiv);
    });
}
// 탭 생성
function createTab(arr,pos, className) {
    arr.forEach( v => {
        const tabDiv =
        `<div class="${className}" data-num= "${v.themeNum}">
        ${v.name}</div>`;
        pos.insertAdjacentHTML("beforeend", tabDiv);
    });

}
// 데이터 비우기
function deleteTags(tags) {
    let check = document.querySelectorAll(tags)
    if (check) {
        check.forEach(v => v.remove());
    }
}

// 카메라 화면 출력
function cameraStart(pos){
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream){
            track = stream.getTracks()[0];
            pos.srcObject = stream;
        })
        .catch(function(error){
            console.log(error.name+":"+error.message);
            alert("카메라를 사용할 수 없습니다.");
        })
}
