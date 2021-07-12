import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { NgModel } from "@angular/forms";

import suneditor from "suneditor";
import SunEditor from "suneditor/src/lib/core";
import { SunEditorOptions } from "suneditor/src/options";
import plugins from "suneditor/src/plugins";
import { environment } from "../../../../environments/environment";
import { apiServerUrl } from '../../../@core/implementations/serverUrl';

@Directive({
  selector: "textarea[editor]",
  providers: [NgModel],
  host: { "(ngModelChange)": "ngOnChanges($event)" },
})
export class EditorDirective implements OnInit {
  editor: SunEditor;
  changedHere = false;
  @Input("ngModel") modelValue: string;
  @Input('editor') options?: SunEditorOptions;
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private el: ElementRef, private ngModel: NgModel) {
  }

  ngOnInit(): void {
    const defaultOptions: SunEditorOptions = {
      //mode: 'inline',
      plugins: plugins,
      minHeight: '200px',
      maxHeight: '500px',
      width: '100%',
      buttonList: [
        ["undo", "redo"],
        ["fontSize", "formatBlock"],
        ["paragraphStyle", "blockquote"],
        ["bold", "underline", "italic", "strike", "subscript", "superscript"],
        ["fontColor", "hiliteColor", "textStyle"],
        ["removeFormat"],
        ["outdent", "indent"],
        ["align", "horizontalRule", "list", "lineHeight"],
        [
          "table",
          "link",
          "image",
          "video",
          "audio",
          "imageGallery" /** ,'math' */,
        ], // You must add the 'katex' library at options to use the 'math' plugin.
        ["fullScreen", "showBlocks", "codeView"],
      ],
      imageUploadUrl: apiServerUrl() + "/api/admin/media/editor",
      imageGalleryUrl:
        apiServerUrl() + "/api/admin/media/editor/gallery",
      attributesWhitelist: {
        'all': 'class'
      }      
    };

    const userOptions = this.options || {};
    this.editor = suneditor.create(this.el.nativeElement, {...defaultOptions, ...userOptions});

    const self = this;
    this.editor.onChange = function (contents: string) {
      self.editor.save();

      self.changedHere = true;
      self.modelValue = contents;
      self.ngModelChange.emit(contents);
      self.ngModel.control.updateValueAndValidity();
      self.el.nativeElement.dispatchEvent(new Event("change"));
    };
  }

  ngOnChanges($event: SimpleChanges): void {
    if ($event && $event.modelValue) {
      if (!this.changedHere) {
        const value = $event.modelValue.currentValue || "";
        setTimeout((_) => this.editor.setContents(value), 0);
      } else {
        this.changedHere = false;
      }
    }
  }
}
