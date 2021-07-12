import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { MediaSelectDialogComponent } from "../../components/media/media-select-dialog/media-select-dialog.component";

@Directive({
  selector: "button[image-select]",
})
export class ImageSelectDirective implements OnInit {
  @Output("image-select") imageSelected: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(
    private el: ElementRef<Element>,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {}

  @HostListener("click", ["$event"]) onClick($event) {
    this.dialogService
      .open(MediaSelectDialogComponent, {
        dialogClass: "large-dialog",
        context: {
          selectedUrl: (this.el.nativeElement.parentNode  as HTMLElement).previousElementSibling.querySelector('input').value,
        },
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.imageSelected.emit(result);
        }
      });
  }
}
