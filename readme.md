# Тестовое задание в sBoard

Программа создает случайные фигуры и записывает их в документ. Документ содержит множество экземпляров `Element`. Сейчас поддерживается только прямоугольник `new RectElement(x:number, y: number, w:number, h:number, r:number=0, s:number=0)`.

Документ имеет событие `update`. На событие подписаны два объекта, которые перерисовываются после каждого обновления — это Pixi и Skia-canvas.

Skia-canvas дополнена методами реализующими рисование в ПДФ. Для этого стандартная сборка дополнена двумя методами для объекта SkCanvas — `beginPDFDocument(w, h)` — возвразающая объект класса SkCanvas, на котором можно повторить рендер документа и `exportToPDFHex():string` — возвращающий hex строку готового ПДФ-файла.

Приложение сделано с использованием Vite и чтобы его запустить локально, достаточно две команды — `npm install` и `npm run dev`.

Пример PDF-файла [example.pdf](example.pdf)