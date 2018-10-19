import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

// This SVG file import will be handled by webpack's raw-text loader.
// This means that imageIcon will hold the source SVG.
import lowIcon from "@ckeditor/ckeditor5-core/theme/icons/quote.svg";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";


export default class CreateList extends Plugin {
  init() {
    const editor = this.editor;
    const schema = editor.model.schema;

    editor.ui.componentFactory.add("createList", locale => {
      const view = new ButtonView(locale);

      view.set({
        label: "Link all headers",
        icon: lowIcon,
        tooltip: true
      });

      // Callback executed once the image is clicked.
      view.on("execute", () => {
        editor.model.change(writer => {
          // this is all h2 tags with or without id's
          let matches = [],
            result,
            data = editor.getData(),
            str = data,
            outPutString;

          do {
            result = str.match(
              /<h2[\s]*(?:id=[\"']([a-z0-9]+)[\"'])?>(.*?)<\/h2>/i
            );
            if (result !== null) {
              matches.push({
                id:
                  typeof result[1] == "undefined"
                    ? result[2].replace(/\s/g, "")
                    : result[1],
                text: result[2],
                addedId: typeof result[1] == "undefined" ? true : false
              });
              str = str.substr(str.indexOf(result[0]) + result[0].length);
            }
          } while (result !== null);

          outPutString = "<ul>";

          for (var items in matches) {
            outPutString +=
              "<li><a href='#" +
              matches[items].id +
              "'>" +
              matches[items].text +
              "</a></li>";
          }
          outPutString += "</ul>";

          // alert(data);

          // Foreach matches where matches[key]["addedId"] === true
          for (var key in matches) {
            var regEx = new RegExp(
              "(<h2[s]*)(>" + matches[key].text + "</h2>)",
              "i"
            );
            data = data.replace(regEx, '$1 id="' + matches[key].id + '"$2'); // Where data is editor.getData earlier
          }

          editor.setData(
            outPutString + '<br>' + data
          );
        
        });
      });

      return view;
    });
  }
}
