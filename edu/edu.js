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


let constraints = { video: { facingMode: "user"}, audio: false};
const cameraView = document.querySelector("#camera--view");

function cameraStart(){
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream){
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;

        })
        .catch(function(error){
            console.error("카메라에 문제가 있습니다.", error);
            alert("카메라를 사용할 수 없습니다.");
        })
}

// 셀렉트에 목록 출력
partList.forEach(v => {
    const option = `<option value="${v}">${v}</option>`;
    parts.insertAdjacentHTML("beforeend", option);
});

// 셀렉트 박스에서 항목을 선택할 때마다
parts.addEventListener("change", (e) => {
    let selectedValue = e.target.value;
    // 담긴 내용을 확인하고, 중복을 제외해 리스트로 만들기 
    deleteTags(".directions");
    deleteTags(".edu-pics");
    deleteTags(".subject");
    body.classList.remove("entrance");

    switch (selectedValue) {
        case partList[0]:

            // 스탠다드 구성 수업작
            let comp = edu.filter(d => d.part == selectedValue && d.role == 0);
            // 보충이 필요한 수업작
            let comp2 = edu.filter(d =>d.part == selectedValue && d.role == 1);
            // 스탠다드 구성 설명 데이터
            let subTitleGroup = edu.filter(d =>d.part == selectedValue && d.role == 2);
            
            // 서브타이틀 버튼 생성 (배열, 위치, 클래스)
            createBtn(subTitleGroup, subTitle, "subject edu-btn");
            // 이미지배열, 위치, 캐시위치, 그룹클래스, 개별클래스
            imgListUp(comp, imgs, imgCache, "edu-pics", "edu-pic");
            break;
        
        case partList[1]:
            //조형성과 상호작용            
            const direction = edu.filter(d => d.part == selectedValue);
            createTab(direction, subTitle, "subject tab-ds")
            const tabs = document.querySelectorAll(".tab-ds");
            docDirection(tabs[0],0);
            break;

        default :
            body.classList.add("entrance");
            break;
    }
});

// 이미지를 클릭하면 컴포지션 구조 표시
imgs.addEventListener("click", (e) => {
    if (e.target!= imgs){
        replacecImg(edu, e.target);
    }
}); 

// 서브타이틀 세부 내용 표시
subTitle.addEventListener("click", (e) =>{
    selectedValue = parts.options[parts.selectedIndex].value;

    // 배경이 아닌 버튼을 눌렀다면
    if(e.target != subTitle) {
        const selected = e.target;

        // 누른 버튼이 어디 파트에 속했냐에 따라 다른 내용 출력
        switch (selectedValue) {
            case partList[0]:// 서브타이틀 버튼 누르면 모달창 띄우고 내용 출력
                
                body.classList.add("of-hidden");
                // 구성 자료 필터링
                const comp = edu.filter(d => d.id == selected.dataset.id);
                // 클래스명(배경색) 모아 배열로 만들기
                const data = edu.filter(d => d.part == selected.dataset.part);
                const colorList = data.map(d => d.color);
                
                const content =
                `<div class="edu-explain">
                <span class="modal-close">×</span>
                <div class="text-head">${comp[0].name}</div>
                <div class="text-head text-explain">${comp[0].explain}</div>
        
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
                break;
            case partList[1]:// 서브탭 누르면 내용 변경
                const tabs = document.querySelectorAll(".tab-ds");
                const themeNum = selected.dataset.num;
                tabs.forEach( d=> d.classList.remove("tab-s"));
                docDirection(selected, themeNum);
        }
    } 
});

function docDirection(sel, themeNum){
    deleteTags(".directions");
    if (themeNum == 0){
        sel.classList.toggle("tab-s")

        formationDiv =
        `<div class="directions"> 주제 영역에서 사물을 구성할 때, 
        조형성을 바탕으로 아이디어를 표현해봅시다.
        </div>`
        container.insertAdjacentHTML("beforeend", formationDiv);

    }else if(themeNum == 1){
        sel.classList.toggle("tab-s")

        interactionDiv =
        `<div class="directions"> 
        주제 영역에서 사물을 구성할 때, 
        상호작용을 바탕으로 아이디어를 표현해봅시다.</div>`
        container.insertAdjacentHTML("beforeend", interactionDiv);

    }
}


//카메라
cam.addEventListener("click", (e) => {
    body.classList.add("of-hidden");
    modalBack.classList.toggle("view");
    modalBack.classList.add("comp-bal");
    const camDiv =
    `<div class="camera--set">
    <span class="modal-close">×</span></br>

    <div id="camera">
    <video id="camera--view" autoplay palysinline></video>
    </div>

    <div class="overlapping"></div>
    <div class="overlapping blend"></div>

    </div>`;    
    camArea.insertAdjacentHTML("beforeend", camDiv);
    console.log("test");
    cameraStart();
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
    const comp = arr.filter(d => d.id == selectOne.dataset.id);
    const imgStyle = selectOne.style.backgroundImage;

    const original = `url("${comp[0].img}")`;
    const replace = `url("${comp[0].decodeImg}")`;

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
function imgListUp(arr, pos, pos2, groupClass, itemClass) {
    arr.forEach(v => {
        const imgDiv =
        `<div class="${groupClass}">
        <div class="${itemClass}" data-id="${v.id}"
        style="background-image:url('${v.img}');"></div></div>`
        pos.insertAdjacentHTML("beforeend", imgDiv);

        const preLoad =
        `<img src="${v.decodeImg}"/>`
        pos2.insertAdjacentHTML("beforeend", preLoad);
    });
}
// 버튼 생성
function createBtn(arr, pos, className) {
    arr.forEach(v => {
        const btnDiv =
        `<button class="fonF ${className} ${v.color}"
        data-id="${v.id}" data-part="${v.part}">
        ${v.name}</button>`;
        pos.insertAdjacentHTML("beforeend", btnDiv);
    });
}
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

