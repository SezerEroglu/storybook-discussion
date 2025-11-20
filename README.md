# storybook-discussion

Bu belge, halihazrıda bulunan boyner-frontend projesinin, Horizon projesi kapsamında, tam Storybook entegrasyonu'nun gereksinimleri, önemli önbilgileri ve gereksinimleri karşılamak için alınabilecek refactor adımlarını örnekleri ile içerir.

## Teknik önbilgiler

- Storybook: React component'lerin izole olarak, default ve customizable prop'lar render edilerek test/review edilebilmesini sağlayan tool framework.

## Problem kaynağı

Storybook içinde configure edilen component'lerin içinde ana proje içerisinde olan business hook'ları bulunamaz. Bunun sebebi, component render ediliken bu business hook'lar Storybook environment içinde sağlanamaz ve sağlanmamalıdır. Bu pure component felsefesine aykırıdır ve bu component'lerin izole edilmesini engeller.

Bu sebeple Storybook içinde kullanılacak component'lerin tüm argümanlarını props olarak alması gerekemektedir. Bazı global logic provider'lar (theme, isMobile ve auth v.b) minimal olarak replicate edilebilir fakat bu işlem TÜM component'lerde ve tüm provider'larda yapılması çok zordur ve pratikte tüm kaynak uygulamayı klonlamaya eşdeğerdir.

İstenen component'leri ve bu component'lerin children'ları business logic'ten ayrıştırılmalı props ile çalışan pure componentler haline refactor edilmelidir. Fakat bunun önünde ana bir engel vardır.

## Ana problem

[Varsayılan Senaryo](/scenario-0/parent-component.tsx)

Varsayılan senaryoda, bir parent bir child component, ikisi de business hook kullanmaktadır. Bu sebeple [.stories](/scenario-0/broken.stories.ts) dosyasında doğrudan kullanıldığı takdirde, parent ve child component içinde kullanılan hook'ların provider eksikliğinden render hatası verecektir. Bu durum boyner-frontend projesinde entegrasyon ve UI katmanı ayrı olan uygun componentler bulunsa da hala sıklıkla mevcuttur.

### Ana problem özeti
İçinde business hook bulunan ve/veya child component'inde business hook bulunan component'ler Storybook senaryolarında ana component olarak **kullanılamaz**. 

## Refactor senaryoları


