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
  constructor(public homeService: HomeService,private DomSan: DomSanitizer, private router: Router, private meta: Meta, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar,private deviceService: DeviceDetectorService) 
  {
    //this.epicFunction();  
   
  }
  ngOnInit() {
    //this.siteurl = encodeURIComponent(environment.siteURL+this.router.url);
    this.siteurl = environment.siteURL+this.router.url;  
   // this.siteurl = urlstr.replace(/&/g, "&amp;");
    //this.siteurl = 'http://3.89.222.134/?nOwrCd=0&amp;OwrTp=0&amp;nLdgCd=3259&amp;nType=1&amp;nCtCd=0';
    this.activatedRoute.queryParams.subscribe((params) => {
      this.newsId = params['nLdgCd'];
      this.getArticleData(params['nLdgCd']);
    });
   
    let url = "https://api.ipify.org/?format=json";
    this.homeService.getvisitorIP(url).subscribe((res) => {
      this.homeService.storeIpAddress(res.ip,this.newsId).subscribe((res) => {
      });
    });

//     const link = encodeURI('https://openjavascript.info');
// const msg = encodeURIComponent('Hey, I found this article');
// const title = encodeURIComponent('Article or Post Title Here');
// const fb = document.querySelector('.facebook');
// fb.href = `https://www.facebook.com/share.php?u=${link}`;
// const twitter = document.querySelector('.twitter');
// twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=javascript,programming`;
// const linkedIn = document.querySelector('.linkedin');
// linkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`;
// const reddit = document.querySelector('.reddit');
// reddit.href = `http://www.reddit.com/submit?url=${link}&title=${title}`;
// const whatsapp = document.querySelector('.whatsapp');
// whatsapp.href = `https://api.whatsapp.com/send?text=${msg}: ${link}`;
// const telegram = document.querySelector('.telegram');
// telegram.href = `https://telegram.me/share/url?url=${link}&text=${msg}`;
  }
  shareOnWhatsAppaa() {
  //  debugger;
  //  let urlstr = 'http://3.89.222.134/?nOwrCd=0&nOwrTp=0&nLdgCd=3822&nType=1&nCtCd=0';
    //let newurl = urlstr.replace(/&amp;/g,'&');
   // let newurl =urlstr.replace(/&/g, "&amp;");
   // const articleUrl = encodeURI('http://3.89.222.134/?nOwrCd=0&nOwrTp=0&nLdgCd=3822&nType=1&nCtCd=0').replace(/&amp;/g,'&');
   // const articleUrlaaaa = encodeURIComponent('http://3.89.222.134/?nOwrCd=0&nOwrTp=0&nLdgCd=3822&nType=1&nCtCd=0');
   // console.log(newurl);
    //console.log(articleUrlaaaa);
  //  const shareUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(articleUrl)}`;
   // window.location.href = this.siteurl;
    // Specify the article URL and image URL
    
   // const imageUrl = 'https://llimagestore2703.blob.core.windows.net/abcmedia/1ff54b48-e90a-487e-8d1c-bcb9f95a6f9904.jpg';
    // Generate the WhatsApp share link
    //const shareUrl = `whatsapp://send?text=${encodeURIComponent(articleUrl)}&image=${encodeURIComponent(imageUrl)}&src=${encodeURIComponent(imageUrl)}`;
    //const shareUrl = `whatsapp://send?text=${encodeURIComponent(articleUrl)}&image=${encodeURIComponent(imageUrl)}`;
    //const shareUrl = `https://wa.me/?text=${encodeURIComponent(articleUrl)}&image=${encodeURIComponent(imageUrl)}`;
    
//    const shareUrl = `https://api.whatsapp.com/send?text=${imageUrl}: ${articleUrl}`;
    //this.testVar= this.DomSan.bypassSecurityTrustHtml(shareUrl);
    //'https://wa.me?text=https://kya.news/news/assets/images/White_Logo.png'
    // Open the WhatsApp share link
    //window.open(this.testVar.changingThisBreaksApplicationSecurity);
  //  window.open(shareUrl);
    //window.location.href = testVar;

     // Encode the share text and create the share link


  // Open the share link in a new window
  //window.open(shareLink);
  }
  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
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
    // this.snackBar.open('Copied!', '', {
    //   duration: 2000,
    //   //verticalPosition: ,
    //   //horizontalPosition: placementAlign,
    //   //panelClass: colorName,
    // });
    setTimeout(() => {this.isShowBage=false;},2000);
    
  }
  getArticleData(id){
    //debugger
    this.homeService.getArticleData(id).subscribe((res) => {
      debugger
      if (res['oError']['nErCd'] === 0) {
        this.articleTitle = res['oResponseData']['oShtNws']['sHdeTxt'] !== null ? res['oResponseData']['oShtNws']['sHdeTxt'] : '';
        this.articleData = res['oResponseData'];
        this.articleAuthor=res['oResponseData']['oShtNws']['sAtrNm'];
        if(res['oResponseData']['oShtNws']['oMediaArr'][0]['sURL'] !== ''){
          //this.articleImage=res['oResponseData']['oShtNws']['oMediaArr'][0]['sURL'];          
          this.articleImage=res['oResponseData']['oShtNws']['oMediaArr'];
          res['oResponseData']['oShtNws']['oMediaArr'].forEach((value) => {
            this.articleMultiImages.push({path: value.sURL})
            })
          //   images = [
          //     {path: 'PATH_TO_IMAGE'},
          //     ...
          // ]
        }
        
        this.artSingleimg = this.articleMultiImages[0]['path'];
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
