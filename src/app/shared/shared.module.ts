import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatSortModule,
  MatTableModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import {ErrorMessageComponent} from './error-message/error-message.component';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  // tslint:disable-next-line: prettier
  declarations: [ErrorMessageComponent],
  imports: [
    CommonModule,
    // TODO: consider using material components per module OR MATERIAL MODULE TO WRAP MATERIAL MODULES
    // Material
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatPaginatorModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatMomentDateModule,
    MatDialogModule
  ],
  exports: [
    ErrorMessageComponent,
    // Material
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatPaginatorModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    MatSortModule,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatMomentDateModule,
    MatDialogModule
  ],
  entryComponents: [],
  providers: [{provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}]
})
export class SharedModule {}
