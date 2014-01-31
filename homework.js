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
     * Создание єлемента с параметрами
     * @param {String} tagName название создаваемого тега
     * @param {String} className класс элемента
     * @param {HTMLElement} parentElement предок, которому будет добавлятся данный элемент
     * @param {String} value записуемое значение в тег
     * @private
     */
    function _createElementWithProperties(tagName, className, parentElement, value){
        var element = document.createElement(tagName);
        element.className = className;
        if(typeof value !== 'undefined')
            element.innerHTML = value;
        if(typeof  parentElement !== 'undefined')
            parentElement.appendChild(element);
        return element;
    }

    /**
     * Удаляет Popup из DOM
     */
    function _deletePopup(){
        var wrapper = document.getElementsByClassName('content')[0],
            popup = document.getElementsByClassName('popup-overlay')[0];

        if(!popup || !wrapper) return;

        wrapper.removeChild(popup);
    }

    /**
     * Получает данные из ссылки
     * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
     * @param {HTMLElement} link Ссылка с data-аттрибутами
     */
    function openPopupFromLink(link) {
        var title = link.dataset.title,
            message = link.dataset.message.replace('%s',link.getAttribute('href')),
            popupElement = createPopup(title, message, function(e){
                    var event = e || window.event,
                        target = event.target || event.srcElement;

                    window.location.href = link.getAttribute('href');
            }),
            content = document.getElementsByClassName('content')[0];

        content.appendChild(popupElement);
    }

    /**
     * Создаёт DOM-узел с сообщением
     * @param {String} title Заголовок сообщение
     * @param {String} message Текст сообщения сообщение
     * @param {Function} onOk Обработчик клика по кнопке 'Да'
     * @returns {HTMLElement}
     */
    function createPopup(title, message, onOk) {
        var overlay = _createElementWithProperties('div','popup-overlay'),
            popupContainer = _createElementWithProperties('div','popup', overlay),
            closeButton = _createElementWithProperties('div','popup-close', popupContainer, '&times'),
            titleTag = _createElementWithProperties('div', 'popup-title', popupContainer, title),
            messageTag = _createElementWithProperties('div', 'popup-message', popupContainer, message),
            falseButton = _createElementWithProperties('div', 'button false', popupContainer, 'Нет'),
            OkButton = _createElementWithProperties('div', 'button ok', popupContainer, 'Да');

        popupContainer.addEventListener('click', function(e){
            var event = e || window.event,
                target = event.target || event.srcElement,
                className = target.className;

            if(className === 'popup-close' || className.indexOf('false') != -1) _deletePopup();
            if(className.indexOf('ok') != -1) onOk();
            return;
        });
        return overlay;
    }
}();

