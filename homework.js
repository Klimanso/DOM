var PopupLoader = function(){
    'use strict';

    var parentLink = document.getElementsByClassName('links')[0];

    parentLink.addEventListener('click', _onMouseClick);

    /**
     * Обработчик клика по ссылке с классом 'popup-link'
     * @param {Event} e событие клика
     * @private
     */
    function _onMouseClick(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;

        if(target.tagName !== 'A' && target.className !== 'popup-link') return;

        if(event.preventDefault)
            event.preventDefault();
        event.returnValue = false;

        openPopupFromLink(target);
    }

    /**
     * Получает данные из ссылки
     * вставляет данные в соотетствующие поля Popup'a (addInformation) и показывает его на странице
     * @param {HTMLElement} link Ссылка с data-аттрибутами
     */
    function openPopupFromLink(link) {
        var title = link.dataset.title,
            message = link.dataset.message.replace('%s',link.getAttribute('href')),
            popupElement = addInformation(title, message, function(e){
                    var event = e || window.event,
                        target = event.target || event.srcElement;

                    window.location.href = link.getAttribute('href');
            });

        popupElement.show();
    }

    /**
     * Создаёт DOM-узел с сообщением
     * @param {String} title Заголовок сообщение
     * @param {String} message Текст сообщения сообщение
     * @param {Function} onOk Обработчик клика по кнопке 'Да'
     * @returns {HTMLElement}
     */
    function addInformation(title, message, onOk) {
        var overlay = document.getElementsByClassName('popup-overlay')[0],
            popupContainer = document.getElementsByClassName('popup')[0],
            popupTitle = document.getElementsByClassName('popup-title')[0],
            popupMessage = document.getElementsByClassName('popup-message')[0];

        popupTitle.innerHTML = title;
        popupMessage.innerHTML = message;

        popupContainer.addEventListener('click', function(e){
            var event = e || window.event,
                target = event.target || event.srcElement,
                className = target.className;

            if(className === 'popup-close' || className.indexOf('false') != -1) overlay.hide();
            if(className.indexOf('ok') != -1) onOk();
            return;
        });
        return overlay;
    }

    /**
     * Показывает HTMLElement
     */
    HTMLElement.prototype.show = function(){
        this.style.display = 'block';
    }

    /**
     * Скрывает HTMLElement
     */
    HTMLElement.prototype.hide = function(){
        this.style.display = 'none';
    }
}();

