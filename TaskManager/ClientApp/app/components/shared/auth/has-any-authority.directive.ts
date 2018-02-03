import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../user/account.service';

@Directive({
    selector: '[hasAnyAuthority]'
})
export class HasAnyAuthorityDirective {

    private authorities: string[];

    constructor(
        private accountService: AccountService,
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef
        ) {
    }

    @Input()
    set hasAnyAuthority(value: string | string[]) {
        this.authorities = typeof value === 'string' ? [<string>value] : <string[]>value;
        this.updateView();
    }

    private updateView(): void {
        this.viewContainerRef.clear();
        if (this.accountService.hasAnyAuthority(this.authorities)) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
    }
}
