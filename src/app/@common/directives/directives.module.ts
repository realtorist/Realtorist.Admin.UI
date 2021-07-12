import { NgModule } from "@angular/core";
import { NbDialogModule, NbSelectModule } from "@nebular/theme";
import { EditorDirective } from './editor/editor.directive';
import { ImageSelectDirective } from "./media/image-select.directive";

@NgModule({
  imports: [NbDialogModule.forChild(), NbSelectModule],
  exports: [EditorDirective, ImageSelectDirective],
  declarations: [EditorDirective, ImageSelectDirective],
})
export class DirectivesModule {}
