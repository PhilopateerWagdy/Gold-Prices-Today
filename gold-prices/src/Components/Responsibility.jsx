import React from "react";
import { useTranslation } from "react-i18next";

import VerticalAdsense from "./VerticalAdsense";
import HorzAdsense from "./HorzAdsense";

const Responsibility = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-row justify-content-center m-4">
        <div className="border border-dark w-75 h-100 p-3">
          <h3 className="mb-4">{t("resp")}</h3>
          <hr className="border border-dark w-100"></hr>

          <div style={{ whiteSpace: "pre-line" }}>
            {i18n.language === "ar" ? (
              <p>
                {`
                  نود توضيح أن هذا الموقع الإلكتروني مخصص فقط لنقل الأسعار والأخبار، ولا يُعتبر مصدرًا لها. 
\n
جميع البيانات والمعلومات المُقدمة مأخوذة من مصادر خارجية، ويُشار إلى المصدر بوضوح أسفل كل معلومة. يُرجى العلم أن المعلومات المُتاحة على الموقع الإلكتروني قد تكون غير دقيقة أو غير مُحدثة آنيًا، وبالتالي لا يُمكن الاعتماد عليها كمصدر أساسي لاتخاذ القرارات المالية.
\n
 كما نود التأكيد على أن الموقع الإلكتروني لا يُشجع على التداول خارج السوق المصرفية الرسمية، وأن جميع الأسعار المعروضة على المنصة هي لأغراض استشارية فقط. لا يتحمل الموقع الإلكتروني أي مسؤولية عن القرارات المُتخذة بناءً عليها.
\n
 نبذل قصارى جهدنا لضمان دقة وموثوقية المعلومات المُقدمة، ولكننا لا نُقدم أي ضمان بشأن صحة أو اكتمال البيانات. 
\n
يتحمل المستخدمون المسؤولية الكاملة عن استخدام المعلومات المُتاحة على الموقع الإلكتروني. 
\n
باستخدام الموقع الإلكتروني، يُوافق المستخدم على شروط الاستخدام وإخلاء المسؤولية المذكورة أعلاه.
                  `}
              </p>
            ) : (
              <p>
                {`
                  We would like to clarify that this website is intended solely for transmitting prices and news and is not considered a source thereof.
\n
All data and information provided is taken from external sources, and the source is clearly indicated below each piece of information. Please be aware that the information available on the website may be inaccurate or not up-to-date, and therefore cannot be relied upon as a primary source for making financial decisions.
\n
We would also like to emphasize that the website does not encourage trading outside the official banking market, and that all prices displayed on the platform are for advisory purposes only. The website assumes no responsibility for decisions made based on them.
\n
We make every effort to ensure the accuracy and reliability of the information provided, but we make no guarantee as to the accuracy or completeness of the data.
\n
Users bear full responsibility for the use of the information available on the website.
\n
By using the website, the user agrees to the above Terms of Use and Disclaimer.
                  `}
              </p>
            )}
          </div>
        </div>
        <div className="border border-dark d-flex flex-column w-25 me-2">
          <VerticalAdsense />
          <VerticalAdsense />
        </div>
      </div>
      <div className="border border-dark mt-2 mb-4">
        <HorzAdsense />
      </div>
    </div>
  );
};

export default Responsibility;
