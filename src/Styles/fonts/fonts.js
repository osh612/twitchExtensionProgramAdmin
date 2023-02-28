import { createGlobalStyle } from 'styled-components';

import Bold from './SpoqaHanSansNeo-Bold.woff2';
import Light from './SpoqaHanSansNeo-Light.woff2';
import Medium from './SpoqaHanSansNeo-Medium.woff2';
import Regular from './SpoqaHanSansNeo-Regular.woff2';
import Thin from './SpoqaHanSansNeo-Thin.woff2';

export const GlobalFonts = createGlobalStyle`
    @font-face {
        font-family:'SpoqaHanSansNeo';
        src: local('SpoqaHanSansNeo'),
        url(${Bold}) format('woff2');
        font-weight: 700; 		//폰트 기본 설정
        font-style: normal;
    }
    @font-face {
        font-family:'SpoqaHanSansNeo';
        src: local('SpoqaHanSansNeo'),
        url(${Light}) format('woff2');
        font-weight: 300; 		//폰트 기본 설정
        font-style: normal;
    }
    @font-face {
        font-family:'SpoqaHanSansNeo';
        src: local('SpoqaHanSansNeo'),
        url(${Regular}) format('woff2');
        
        font-weight: 400; 		//폰트 기본 설정
        font-style: normal;
    }
    @font-face {
        font-family:'SpoqaHanSansNeo';
        src: local('SpoqaHanSansNeo'),
        url(${Medium}) format('woff2');
        font-weight: 500; 		//폰트 기본 설정
        font-style: normal;
    }
    @font-face {
        font-family:'SpoqaHanSansNeo';
        src: local('SpoqaHanSansNeo'),
        url(${Thin}) format('woff2');
        font-weight: 100; 		//폰트 기본 설정
        font-style: normal;
    }
`;
