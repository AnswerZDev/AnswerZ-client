import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'ucFirst'
})
export class UcFirstPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return '';
        const words = value.split(' ');
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return words.join(' ');
    }
}