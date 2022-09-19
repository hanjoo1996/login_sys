(function() {
    'use strict';


    /** Validation Check Start **/
    /* 이름 */
    document.getElementById('username').addEventListener('blur', function(event) {
        const value = this.value,
              elParent = this.parentElement,
              parentClassList = elParent.classList;

        if(value) {
            if(!/^[ㄱ-ㅎㅏ-ㅣ가-힣]+$/g.test(value)) {
                parentClassList.add('error');
                parentClassList.remove('success');
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
            }
        }else{
            parentClassList.remove('success', 'error');
        }
    });

    /* 이메일 */
    document.getElementById('email').addEventListener('blur', function(event) {
        const value = this.value,
        elParent = this.parentElement,
        parentClassList = elParent.classList;

        if(value) {
            if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(value)) {
                parentClassList.add('error');
                parentClassList.remove('success');
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
            }
        }else{
            parentClassList.remove('success', 'error');
        }
    });
        /*
            (실습문제 1) 이메일 유효성검사 작성
              - 이메일 유효성검사 정규식 : /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                * 다른 이메일 정규식을 검색해서 사용해도 됨
                * 다른 유효성검사 항목 참고하여 작성 (이름, 비밀번호 등)

        */
    

    /* 비밀번호 */
    document.getElementById('pwd').addEventListener('blur', function(event) {
        const value = this.value,
              elParent = this.parentElement,
              parentClassList = elParent.classList;

        if(value) {
            if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(value)) {
                parentClassList.add('error');
                parentClassList.remove('success');
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
            }
        }else{
            parentClassList.remove('success', 'error');
        }
    });

    /* 비밀번호확인 */
    document.getElementById('pwdConfirm').addEventListener('blur', function(event) {
        const value = this.value,
              pwdValue = document.getElementById('pwd').value,
              elParent = this.parentElement,
              parentClassList = elParent.classList;

        if(value) {
            if(value !== pwdValue) {
                parentClassList.add('error');
                parentClassList.remove('success');
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
            }
        }else{
            parentClassList.remove('success', 'error');
        }
    });
    
    /** Validation Check End **/

    document.getElementById('check_all').onclick = () => {

        const checks = document.querySelectorAll('tbody tr td input');
        const allcheck = document.getElementById('check_all').checked
        for (var i = 0; i < checks.length; i++) {
            if (allcheck == true) {
                checks[i].checked = true;
            }
            else {
                checks[i].checked = false;
            }
        }
    }

    
    // 회원가입 submit
      /* 
             (실습문제 2) form 전송 시 각 항목 입력값 확인
              # 이름, 이메일, 비밀번호, 개인정보수집동의 필수 입력 값
         */

    document.getElementById('delete').onclick = () => {
        const checks = document.querySelectorAll('tbody tr td input')
        const allcheck = document.getElementById('check_all').checked
        let del_list = [];
        
        for (var i = 0; i < checks.length; i++) {
            if (checks[i].checked) {
                del_list.push(checks[i].value);
            }
        }

        for (var i = 0; i < checks.length; i++) {
            
            if (!(checks[i].value in del_list)) {
                del_list.push(checks[i].value);
            }
            
        }
        
        for (let j of del_list) {
            window.localStorage.removeItem(j);
        }

        location.reload();

        
    };
 
    document.getElementById('form').addEventListener('submit', function(event) {
        const formElements = [
            document.getElementById('username'), 
            document.getElementById('email'), 
            document.getElementById('pwd'), 
            document.getElementById('pwdConfirm'),
            document.getElementById('userAddr'),
            document.getElementById('privacy'),
            document.getElementById('marketing')
        ];

        let invalid = 0;
        
        for(let element of formElements) {
            
            if(!element.value || (!element.type == 'checkbox')) {
                alert(`${document.querySelector(`label[for="${element.id}"]`).innerText}가(이) 입력되지 않았습니다.`);
                invalid = 1;
                event.preventDefault();
                break;
            }
            else if (element.type === 'checkbox' && !element.checked) {
                alert(`${document.querySelector(`label[for="${element.id}"]`).innerText}가(이) 입력되지 않았습니다.`);
                invalid = 1;
                event.preventDefault();
                break;
            }
        }

        
         
        if (invalid == 0) {
             
            var user_data =  {
                "username":formElements[0].value,
                "email":formElements[1].value,
                "pwd":formElements[2].value,
                "user_addr":formElements[4].value,
                "privacy":formElements[5].value,
                "marketing":formElements[6].value,
            };

            save_localStorage(user_data);

            

            // var user_data = {
            //     "members": [
            //       {
            //         "username": formElements[0].value,
            //         "email": formElements[1].value
                  
            //       }
            //     ]
            // }
    
            //local file (user.json) loading
            //onScreen(user_data);
            //local file saving
            //updateJson();
            
            //local storage saving

             
        }
        
        
    });
    
})();

window.onload = function() {

    //local file get .json file method
    //requestLocal();

    //local storage method
    load_localStorage();

};

function load_localStorage() {
    
    const users = window.localStorage;

    if (users) {
        var t = document.querySelector('#user_template');
        var tb = document.querySelector('tbody');

        objlen = Object.keys(users);

        for (var keys of objlen) {        
            var clone = document.importNode(t.content, true);
            td = clone.querySelectorAll("td");
            ti = clone.querySelector("input");

            const user = users[keys];
            const thisuser = JSON.parse(user);
            
            ti.value = keys;
            td[1].textContent = thisuser.username;
            td[2].textContent = thisuser.email;
            td[3].textContent = thisuser.pwd
            td[4].textContent = thisuser.user_addr;
            td[5].textContent = thisuser.gender;
            td[6].textContent = thisuser.privacy;
            td[7].textContent = thisuser.marketing;

            tb.appendChild(clone);

        }
    }   
}

function save_localStorage(user_data) {

    const user = JSON.stringify(user_data);
    var local_len = window.localStorage.length;

    if (local_len > 0) {
        last_item = local_len - 1;
        window.localStorage.setItem(`${last_item+1}`,user);
        
    }
    else {
        window.localStorage.setItem(`0`,user);
    }
}


// function updateJson() {
//     var t = document.querySelector('#table');
//     var tb = document.querySelector('tbody');
    
//     var tr = tb.querySelectorAll('tr');

//     for (var i = 0; i < tr.length; i++) {
//         //get <tr> elements </tr>
//     }

// }

// CORS 문제로 GITHUB 파일 요청이 해결 안됐습니다.

// function requestXHR() {
//     var requestURL = "https://github.com/hanjoo1996/sorin_edu/blob/main/user.json";
//     var request = new XMLHttpRequest();
//     request.open('GET', requestURL);
//     request.setRequestHeader('Access-Control-Allow-Origin', '*');
//     //request.responseType = 'json';
//     request.send();
//     request.onload = function() {
//         var user_json = request.response;
//          
//         onScreen(user_json);
//     }
// }

// function onScreen(jsonObj) {
//     var users = jsonObj['members'];
//     var t = document.querySelector('#user_template');
//     var tb = document.querySelector('tbody');
//     objlen = Object.keys(users);

//     for (var keys of objlen) {        
//         var clone = document.importNode(t.content, true);
//         td = clone.querySelectorAll("td");

//         td[1].textContent = users[i].username;
//         td[2].textContent = users[i].email;

//         tb.appendChild(clone);

//     }
// }