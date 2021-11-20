var ctrl = $('#control-panel button'),
    output = $('#form-output'),
    form = $('form', output),
    formElems = $(':text, select', form),
    step = output.outerWidth(),
    maxPos = form.width() - step,
    pos, dir,
    ls = {
        set: function () {
            // Сохраняем данные формы и её координаты
            var data = {
                form: form.attr('style'),
                vals: {}
            };
            formElems.each(function (i, el) {
                data.vals[$(el).attr('name')] = $(el).val();
            });
            localStorage.setItem('myform', JSON.stringify(data));
        },
        get: function () {
            var data = localStorage.getItem('myform');
            // Если в LS есть данные, то подставляем в элементы формы
            if (data) {
                data = JSON.parse(data);
                $.each(data.vals, function (name, val) {
                    formElems.filter('[name=' + name + ']').val(val);
                });
                form.attr('style', data.form);
            }
        },
        clear: function (e) {
            // Удаляем данные из LS
            localStorage.removeItem('myform');
            // Если нужно отменить обычную отправку данных
            e.preventDefault();
            $(this).animate({
                left: 0
            })[0].reset();
        }
    };
ls.get();
ctrl.on('click', function () {
    pos = Math.abs(form.position().left);
    dir = ctrl.index(this);
    if (pos > maxPos && dir || pos <= 0 && !dir) {
        return false;
    }
    // После завершения анимации, записываем данные формы в LS
    form.animate({
        left: '-=' + (ctrl.index(this) ? step : -step)
    }, ls.set);
});
// После отправки формы, данные в LS очищаются
form.on('submit', ls.clear);
