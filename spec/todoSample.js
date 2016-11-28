// Основными ключевыми словами при работе с Jasmine являются:
//
// describe — определение набора тестов, наборы могут быть вложенными
// it — определение теста внутри любого набора тестов
// expect — определяет ожидания, которые проверяются в тесте

// Jasmine имеет стандартный набор ожиданий для проверки результатов

$(document).ready(function() {

    describe('TODO MVC spec', function() {
        var app;

        app = window.TodoApp;
        localStorage.clear();
        app.init();

        // describe ('fail', function () {
        //     expect(1).toBe(0);
        // });

        describe ('when application is constructed', function () {

            it ('should exist', function() {
                expect(app).toBeDefined();
            });

            describe ('when new task was created', function () {

                // add tasks
                $('#new-todo').val('Task 1').trigger($.Event('keyup', {which: 13}));

                it ('then app.todos must contain 1 task', function () {
                    expect(app.todos.length).toBe(1);
                });

                it ('then 1st todo item title was eq to Task 1', function () {
                    expect(app.todos[0].title).toBe('Task 1');
                });

                describe ('when I complete 1st task', function () {

                    // activate item
                    $('#todo-list').find('li').eq(0).find('.toggle').trigger('change');

                    it ('then 1st item should be completed', function () {
                        expect(app.todos[0].completed).toBeTruthy();
                    });

                    it ('then 0 items left in count', function () {
                        expect(parseInt($('#todo-count').find('strong').text())).toBe(0);
                    });
                });
            });
        });

    });

});
