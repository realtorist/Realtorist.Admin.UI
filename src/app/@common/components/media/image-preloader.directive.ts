import { Directive, Input, OnInit } from '@angular/core';

@Directive({
    selector: 'img[preload]', 
    host: {
        '[attr.src]': 'finalImage' 
    }
})

export class ImagePreloader implements OnInit {
    @Input('preload') targetSource: string;

    downloadingImage: any;
    finalImage: any;

    @Input() defaultImage: string = 'assets/images/img-preloader.svg';

    ngOnInit() {
        this.finalImage = this.defaultImage;

        this.downloadingImage = new Image();  
        this.downloadingImage.onload = () => {
            this.finalImage = this.targetSource;
        }

        this.downloadingImage.src = this.targetSource;
    }

}