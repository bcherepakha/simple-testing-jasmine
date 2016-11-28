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
        window.location.hash = '';
        app.init();

        // describe ('fail', function () {
        //     expect(1).toBe(0);
        // });

        describe ('when application is constructed', function () {

            it ('should exist', function() {
                expect(app).toBeDefined();
            });

            it ('should add task', function () {
                $('#new-todo').val('Task 1').trigger($.Event('keyup', {which: 13}));
                var tasks = $('#todo-list').find('li');
                expect(tasks.length).toBe(1);
            });

            it ('should add task 2', function () {
                $('#new-todo').val('Task 2').trigger($.Event('keyup', {which: 13}));
                var tasks = $('#todo-list').find('li');
                expect(tasks.length).toBe(2);
            });

            it ('should complete task 1', function () {
                $('#todo-list').find('li').eq(0).find('.toggle').trigger($.Event('change'));
                expect($('#todo-list').find('li').eq(0).hasClass('completed')).toBeTruthy();
            });

            it ('should model contains complete information about task 1', function () {
                expect(app.todos[0].completed).toBeTruthy();
            });

            describe ('check filters', function () {
                beforeEach(function(done) {
                    var evt = new MouseEvent("click", {
                                                  bubbles: true,
                                                  cancelable: true,
                                                  view: window
                                                });

                    $('#filters').find('li:contains(Active)').find('a')[0].dispatchEvent(evt);

                    setTimeout(function() {
                          if (app.filter === 'active')
                            done();
                      }, 100);
                });

                it ('should worked filter Active', function () {
                    expect($('#filters').find('li:contains(Active)').find('a').hasClass('selected')).toBeTruthy();
                    expect(window.location.hash === '#/active').toBeTruthy();
                    var tasks = $('#todo-list').find('li');
                    expect(tasks.length).toBe(1);
                    expect(tasks.eq(0).find('label').text()).toBe('Task 2');
                });
            });
        });
    });

});
