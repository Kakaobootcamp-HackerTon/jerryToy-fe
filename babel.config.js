module.exports = {
  presets: [
    '@babel/preset-env', // 최신 JavaScript 기능을 사용하기 위한 프리셋
    '@babel/preset-react', // React용 프리셋
    '@babel/preset-typescript', // TypeScript용 프리셋 (TypeScript를 사용하는 경우)
  ],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: ['./src'], // 소스 코드의 루트 디렉토리 설정
        alias: {
          '~': './src', // ~를 src 디렉토리로 매핑
        },
      },
    ],
    [
      'dotenv-import',
      {
        moduleName: '@env', // 환경 변수 모듈 이름
        path: '.env', // 환경 변수 파일 경로
        safe: false, // 안전 모드 사용 여부
        allowUndefined: true, // 정의되지 않은 변수를 허용할지 여부
      },
    ],
  ],
};
