## [ 프로젝트 소개 ]
사용자가 YouTube에서 다시 보고 싶은 영상의 url과 함께 다이어리를 작성하여 공유 할 수 있는 서비스

## [ Link ]
배포 링크 : https://music-1aa8a.firebaseapp.com/

## [ Skills ]
- React / TypeScript
    - 타입의 안정성을 확보하기 위해 TypeScript를 적용
    - 컴포넌트 내부에서 데이터를 get하고,  post 하는 로직이 드러나 있지 않도록 모듈화
    - useLocation으로 state를 전달하여 불필요하게 데이터를 불러오는 로직을 최소화
    - Pagination 구현
- Styled Components
    - Styled Component를 활용하여 반응형 웹 구현
    - ThemeProvider로 다크모드를 구현
- Redux-Toolkit
    - Redux toolkit을 활용 하여 로그인 state를 전역적으로 관리
    - Local Storage를 활용하여 로그인 상태를 유지
- Firebase
    - firebase를 통한 자체 회원가입, 자체 로그인, 회원 탈퇴를 구현
    - firebase database에 데이터 저장

## [ 화면 구성 및 설명 ]
### [ 메인 페이지 ]

- 전체 데이터를 가져와 렌더링하고 Pagination 구현
  
 ![스크린샷 2023-07-04 오후 10 08 50](https://github.com/handaehee93/YouToo-Refactoring-Team-Project/assets/111215434/bec8c9a9-fa01-4855-a99a-1030e5176700)
    
- 각각의 태그 버튼을 클릭하면 해당 태그와 관한 다이어리만 filtering하여 렌더링
  
 ![스크린샷 2023-07-04 오후 10 10 02](https://github.com/handaehee93/YouToo-Refactoring-Team-Project/assets/111215434/05a5d965-4a33-4eb6-9bd7-af01c949df65)

### [ 로그인 페이지 ]

- Navbar의 로그인 버튼 클릭시 로그인 페이지 이동
- firebase를 통한 email, password 자체 로그인 구현
  
  ![스크린샷 2023-07-04 오후 10 11 27](https://github.com/handaehee93/YouToo-Refactoring-Team-Project/assets/111215434/d29eb25e-645a-4529-a977-82ab82bba23b)

  
### [ 회원가입 페이지 ]

- 로그인 페이지 하단 회원 가입 버튼 클릭시 회원 가입 페이지 이동
- Firebase를 이용하여 닉네임, 이메일, 비밀번호를 입력 받아 회원 가입을 하고, 유저의 정보를 Firebase Database에 저장

![스크린샷 2023-07-04 오후 10 12 14](https://github.com/handaehee93/YouToo-Refactoring-Team-Project/assets/111215434/d55eb17f-352f-4757-b724-f72f0989edb8)


- 유효성 검사를 진행하여 사용자가 닉네임, 이메일, 비밀번호 중 하나라도 입력하지 않으면 경고 메세지 표시
- 회원가입이 정상적으로 완료 되면 로그인 페이지로 이동

![스크린샷 2023-07-04 오후 10 12 52](https://github.com/handaehee93/YouToo-Refactoring-Team-Project/assets/111215434/ae8ee10a-dde2-4dfc-8dff-0c456916387f)

    

### [ 사용자가 로그인을 한 경우 ]

- 사용자가 로그인을 하면 user의 정보를 Redux-Toollkit의 logined State에 저장
- Redux에 저장된 사용자의 정보 즉, logined State를 메인 페이지 컴포넌트로 가져온 뒤localStorage에 저장
- localStorage에 저장된 값을 가져와 해당 값이 True일때 즉, 사용자가 로그인을 했을 경우 Navbar의 형태 아래와 같이 변경

![스크린샷 2023-07-04 오후 10 13 53](https://github.com/handaehee93/YouToo-Refactoring-Team-Project/assets/111215434/456e6031-567e-4d58-bb75-8d7a005db684)


    

### [ 다이어리 디테일 페이지 ]

- 각각의 다이어리 클릭시 디테일 페이지로 이동 되고, 하단의 유튜브 링크 클릭시 유튜브로 이동 되어 영상 재생
- 사용자가 로그인을 하지 않았거나, 해당 다이어리를 작성한 사용자가 아니라면 디테일 페이지의 수정, 삭제 버튼이 나타나지 않게 함

![스크린샷 2023-07-04 오후 10 15 00](https://github.com/handaehee93/YouToo-Refactoring-Team-Project/assets/111215434/6c3db08b-9eae-4a87-8722-4745242ce6b4)


- 사용자가 로그인을 한 상태이고, 본인이 작성한 다이어리를 클릭하면 수정, 삭제 버튼이 나타남
- Firebase파일에 만들어둔 함수를 통해 로그인한 사용자의 정보를 받아와서, 디테일페이지를 컴포넌트에 전달한 props 안에 있는 사용자의 정보를 비교하여 정보가 일치하면 수정, 삭제 버튼이 나타나도록 구현
    
![스크린샷 2023-07-04 오후 10 16 04](https://github.com/handaehee93/YouToo-Refactoring-Team-Project/assets/111215434/cf36dfd3-08a9-4f9e-95ad-0f15169099d5)

    

### [ 수정 / 삭제 버튼 클릭시 ]

- 수정 버튼 클릭시 input창이 생성이 되고 제목, 다이어리 소개, 유튜브 링크를 수정할 수 있음
- 수정하기 버튼 클릭시 Firebase Database의 데이터가 수정되고 다시 메인페이지로 이동

![스크린샷 2023-07-04 오후 10 17 23](https://github.com/handaehee93/YouToo-Refactoring-Team-Project/assets/111215434/b1d6a4e1-8cc6-4e35-8bea-e22c2bfdc2ab)

    
- 삭제버튼 클릭시 Firebase Database의 데이터가 삭제되고 메인페이지로 이동

### [ 새 다이어리 등록 버튼 클릭시]

- 사용자가 로그인을 하지 않은 상태에서 다이어리 등록 버튼 클릭시 로그인 페이지로 이동
- 사용자가 로그인을 한 상태라면 다이어리 등록 페이지가 나타남
    
![스크린샷 2023-07-04 오후 10 17 56](https://github.com/handaehee93/YouToo-Refactoring-Team-Project/assets/111215434/90f33b5c-b0c7-411b-82a3-aeb68408bf3b)

    
- 사용자라 유튜브 링크를 복사한 후 추가 버튼을 누르면 해당 링크의 id를 필터링
- 해당 id와 발급받은 YouTube Api key를 axios get요청 주소에 담아 해당 링크의 유튜브 동영상에 관한 정보를 받아와 표시
    
![스크린샷 2023-07-04 오후 10 18 59](https://github.com/handaehee93/YouToo-Refactoring-Team-Project/assets/111215434/a61f431e-683c-4b80-90f3-bf81c76722b6)

    
- 등록하기 버튼 클릭시 Firebase Database에 저장이 되고, 메인 페이지로 이동

### [ 마이 페이지 ]

- Navbar에서 오른쪽 상단의 아이콘 클릭시 Drop Down 메뉴 나타남
    
![스크린샷 2023-07-04 오후 10 21 13](https://github.com/handaehee93/YouToo-Refactoring-Team-Project/assets/111215434/d744622c-2e36-40cb-8dca-2da71a3b1700)

    
- 마이페이지를 클릭하면 마이페이지로 이동됨
- 닉네임을 수정할 수 있고, 회원 탈퇴 할 수 있음
    
![스크린샷 2023-07-04 오후 10 19 47](https://github.com/handaehee93/YouToo-Refactoring-Team-Project/assets/111215434/79033b7b-75bd-47c5-b293-32920ee3e7d0)

- 회원 탈퇴 버튼 클릭시 모달창이 나타나고 탈퇴 버튼 클릭시 Firebase Database에 저장된 유저 정보가 삭제 되고, 로그 아웃된 상태로 메인페이지로 이동
    
![스크린샷 2023-07-04 오후 10 20 13](https://github.com/handaehee93/YouToo-Refactoring-Team-Project/assets/111215434/30aa9f94-09c5-4da9-bdc4-e5c2c0482c91)
