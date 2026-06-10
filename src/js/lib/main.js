requirejs.config({
    baseUrl: 'src/js/lib',
    paths: {
        jquery: 'https://code.jquery.com/jquery-4.0.0.min',
        calc: 'calc'
    }
});

requirejs(['../app/app']);