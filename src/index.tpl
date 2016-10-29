<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="utf-8">
        <title>管理后台</title>
        <!-- Polyfills -->
        <!--[if lt IE 10]>
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.9/es5-shim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.9/es5-sham.min.js"></script>
            <script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <div id="root"></div>
        <!-- built files will be auto injected -->
        <% if (process.env.NODE_ENV === 'production') { %>
        <script src="//cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/react-router/4.0.0-0/react-router.min.js"></script><% } %>
    </body>
</html>
