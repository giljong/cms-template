# CMS Template

## 설치 방법

### npm 버전

- 16.15.1

```
nvm use
```

---

<br>

## Antd 테마 변경 방법

### config-override.js 수정

```js
modifyVars: {
  '@primary-color': '#FF4554',
  '@label-color': '#333333',
  '@text-color': '#333333',
  '@link-color': '#0E6EB8',
  '@menu-dark-inline-submenu-bg': '@primary-color',
  '@layout-sider-background': '@primary-color',
  '@menu-dark-bg': '@primary-color',
  '@menu-dark-item-active-bg':
    "color(~`colorPalette('@{primary-color}', 5) `);",
  '@input-color': '#333333',
  '@page-header-padding': '0px',
  '@btn-font-weight': 'bold',
}
```

웬만하면 @primary-color만 바꿔주면 되지만, 필요에 따라 아래 참고 링크를 참고하여 더 추가해도 됨

[[참고]](https://github.com/ant-design/ant-design/blob/4.x-stable/components/style/themes/default.less)

<br>

---

### 적용 방법

1. config-override.js 파일 수정
2. node_modules 내에 있는 .cache 폴더 제거
3. npm run start:dev 실행 (이미 실행시키고 있었다면 껐다가 다시 실행)

<br>

---

### 사이드메뉴 배경색

`src/styles/colors.ts`

- 위 파일 내에 있는 PRIMARY 값 변경

<br>

---

<br>

## 컴포넘트

`src/components`

<br>

### 사이드메뉴

`AsideMenu`
