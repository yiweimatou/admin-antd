<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="utf-8">
        <title>管理后台</title>
        <style>
            html body {
                background: #e9e9e9;
                height: 100%;
                font-size: 14px;
            }
        </style>
        <!-- Polyfills -->
        <!--[if lt IE 10]>
        <script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <div id="root"></div>
        <!-- built files will be auto injected -->
        <% if (process.env.NODE_ENV === 'production') { %>
            <script src="https://unpkg.com/react@15.3.2/dist/react.min.js"></script>
            <script src="https://unpkg.com/react-dom@15.3.2/dist/react-dom.min.js"></script>
            <script src="https://unpkg.com/react-router@3.0.0/umd/ReactRouter.min.js"></script>
        <% } %>
    </body>
</html>
