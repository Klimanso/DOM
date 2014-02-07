var PopupLoader = function(){
    'use strict';

    var body = document.body,
        popupOverlay = body.getElementsByClassName('popup-overlay')[0];

    body.addEventListener('click', _onMouseClick);

    /**
     * Обработчик клика по ссылке с классом 'popup-link'
     * @param {Event} e событие клика
     * @private
     */
    function _onMouseClick(e) {
        var event = e || window.event,
            target = event.target || event.srcElement;

        if(target.tagName !== 'A' && target.className.indexOf('popup-link') === -1) return;

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
        show(
            addInformation(
                link.dataset.title,
                link.dataset.message.replace('%s', link.getAttribute('href')),
                function(){ window.location.href = link.getAttribute('href');}
            )
        );
    }

    /**
     * Создаёт DOM-узел с сообщением
     * @param {String} title Заголовок сообщение
     * @param {String} message Текст сообщения сообщение
     * @param {Function} onOk Обработчик клика по кнопке 'Да'
     * @returns {HTMLElement}
     */
    function addInformation(title, message, onOk) {
        var popupContainer = popupOverlay.getElementsByClassName('popup')[0],
            popupTitle = popupOverlay.getElementsByClassName('popup-title')[0],
            popupMessage = popupOverlay.getElementsByClassName('popup-message')[0];

        popupTitle.innerHTML = title;
        popupMessage.innerHTML = message;

        popupContainer.addEventListener('click', function(e){
            var event = e || window.event,
                target = event.target || event.srcElement,
                className = target.className;

            if(className === 'popup-close' || className.indexOf('false') != -1) hide(popupOverlay);
            if(className.indexOf('ok') != -1) onOk();
            return;
        });
        return popupOverlay;
    }

    /**
     * Показывает HTMLElement
     */
    function show(element){
        element.style.display = 'block';
    }

    /**
     * Скрывает HTMLElement
     */
    function hide(element){
        element.style.display = 'none';
    }
}();

