import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/home.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
//export { SeoSocialShareData, SeoSocialShareService, NgxSeoMetaTag, NgxSeoMetaTagAttr } from '../seo-social-share/index';
export class HomeComponent {
  siteURL:string=environment.siteURL;
  articleData:any = '';
  deviceInfo:any = null;
  articleTitle:string;
  articleAuthor:string;
  articleImage:string='';
  articleMultiImages:any=[];
  advImage:string;
  articleAuthorImage:string;
  articleDescription:string;
  articleVideoURL:string='';
  artSingleimg:string;
  payableToLoading;
  isShowBage:boolean=false;
  newsId:any;
  testVar:any;
  noPayableTo;
  siteurl:string;
  breadscrums = [
    {
      title: 'Blank',
      items: ['Extra'],
      active: 'Blank',
    },
  ];
  shareData: {
    url: string;
    description?: string;
    tags?: string;
  } = {
    url: this.articleImage,
    description: 'dev',
    tags: 'hussein Abd Elaziz',
  };
  shareLinks: { title: string; link: string }[] = [];
  slides = [
    { img: 'https://via.placeholder.com/600.png/09f/fff' },
    { img: 'https://via.placeholder.com/600.png/021/fff' },
    { img: 'https://via.placeholder.com/600.png/321/fff' },
    { img: 'https://via.placeholder.com/600.png/422/fff' },
    { img: 'https://via.placeholder.com/600.png/654/fff' },
  ];
  slideConfig = { slidesToShow: 1, slidesToScroll: 1 };
  addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }
  constructor(public homeService: HomeService,private DomSan: DomSanitizer, private router: Router, private meta: Meta, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar,private deviceService: DeviceDetectorService) 
  { }
  ngOnInit() {
    this.siteurl = environment.siteURL+this.router.url;
    this.activatedRoute.queryParams.subscribe((params) => {
      this.newsId = params['nLdgCd'];
      this.getArticleData(params['nLdgCd']);
    });
   
    let url = "https://api.ipify.org/?format=json";
    this.homeService.getvisitorIP(url).subscribe((res) => {
      this.homeService.storeIpAddress(res.ip,this.newsId).subscribe((res) => {
      });
    });

  }
  copyText(val: string) {
    this.isShowBage=true;
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    setTimeout(() => {this.isShowBage=false;},2000);
    
  }
  getArticleData(id){
    this.homeService.getArticleData(id).subscribe((res) => {
      //debugger
      if (res['oError']['nErCd'] === 0) {
        this.articleTitle = res['oResponseData']['oShtNws']['sHdeTxt'] !== null ? res['oResponseData']['oShtNws']['sHdeTxt'] : '';
        this.articleData = res['oResponseData'];
        this.articleAuthor=res['oResponseData']['oShtNws']['sAtrNm'];
        if(res['oResponseData']['oShtNws']['oMediaArr'][0]['sURL'] !== ''){
          //this.articleImage=res['oResponseData']['oShtNws']['oMediaArr'][0]['sURL'];          
          this.articleImage=res['oResponseData']['oShtNws']['oMediaArr'];
          res['oResponseData']['oShtNws']['oMediaArr'].forEach((value) => {
            //this.articleMultiImages.push({path: value.sURL})
            this.articleMultiImages.push({img: value.sURL})
            })
        }
        
        this.artSingleimg = this.articleMultiImages[0]['img'];
        if(res['oResponseData']['oShtNws']['oMediaArr'][0]['sVURL'] !== ''){
          this.articleVideoURL=res['oResponseData']['oShtNws']['oMediaArr'][0]['sVURL'];
        }
        this.articleAuthorImage=res['oResponseData']['oShtNws']['oOwrImg']['sURL'];
        this.advImage=res['oResponseData']['oAdptAdv']['oImg']['sURL'];
        this.articleDescription=res['oResponseData']['sDtlTxt'];
      }
      
      this.meta.addTags([
        {property: 'og:title', content: this.articleTitle},
        {property: 'og:url', content: this.siteurl},
        {property: 'og:description', content: ''},
        {property: 'og:image', itemprop: 'image', content: this.artSingleimg},
        {property: 'og:type', content: 'website'},
        {property: 'og:image:width', content: '300'},
        {property: 'og:image:height', content: '300'},
        {property: 'og:image:type', content: 'article'},
        {property: 'og:image:height', content: 'en_GB'}
      ]);
    })
  }
  
}
