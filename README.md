# storybook-discussion

Bu belge, halihazrıda bulunan boyner-frontend projesinin, Horizon projesi kapsamında, tam Storybook entegrasyonu'nun gereksinimleri, önemli önbilgileri ve gereksinimleri karşılamak için alınabilecek refactor adımlarını örnekleri ile içerir.

## Teknik önbilgiler

- Storybook: React component'lerinin izole bir ortamda, varsayılan ve değiştirilebilir prop'larla birlikte test/review edilebilmesini sağlayan bir tool/framework’tür.

## Problem kaynağı

Storybook içinde configure edilen component'lerin içinde ana proje içerisinde olan business hook'ları bulunamaz. Bunun sebebi, component render ediliken bu business hook'lar Storybook environment içinde sağlanamaz ve bu component'lerin izole edilmesini engeller.

Bu sebeple Storybook içinde kullanılacak component'lerin tüm argümanlarını props olarak alması gerekemektedir. Bazı global logic provider'lar (theme, isMobile ve auth v.b) minimal olarak replicate edilebilir fakat bu işlem TÜM component'lerde ve tüm provider'larda yapılması çok zordur ve pratikte tüm kaynak uygulamayı klonlamaya eşdeğerdir.

İstenen component'leri ve bu component'lerin children'ları business logic'ten ayrıştırılmalı props ile çalışan pure componentler haline refactor edilmelidir. Fakat bunun önünde ana bir engel vardır.

## Ana problem

[Varsayılan Senaryo](/scenario-0/parent-component.tsx)

Varsayılan senaryoda, bir parent bir child component bulunmaktadır ve ikisi de business hook kullanmaktadır. Bu sebeple [.stories](/scenario-0/broken.stories.ts) dosyasında doğrudan kullanıldığı takdirde, parent ve child component içinde kullanılan hook'ların provider'ları bulunmadığından render hatası verecektir. Bu durum boyner-frontend projesinde, entegrasyon ve UI katmanı ayrı olan uygun componentler bulunsa da, hala sıklıkla mevcuttur.

### Ana problem özeti

İçinde business hook bulunan ve/veya child component'inde business hook bulunan component'ler Storybook senaryolarında ana component olarak **kullanılamaz**.

## Refactor senaryoları

### 1. Senaryo - Prop Drilling

Tüm business logic, [entegrasyon katmanından](./scenario-1/integration-component.tsx) sağlanır prop olarak gerekli tüm child compontent'lere iletilir.

#### Pros

1. Tüm component'ler rahat bir şekilde Storybook ile [entegre](./scenario-1//scenario-1.stories.ts) edilebilir. Storybook tarafındaki dynamic arg'ları da [iletmesi](./scenario-1//scenario-1.stories.ts) teknik olarak basittir.

#### Cons

1. Bu işlem özellikle 3 veya daha fazla nested component içeren component'lerde çok zordur ve performans açısından da hem re-render hem saf computational açıdan maliyetli ve optimizasyonu zahmetlidir.
2. Component tree ciddi şekilde refactor edilmek zorundadır.

### 2. Senaryo - Mock Context

Business logic içeren her [component'in](./scenario-2/parent-component.tsx) hook'ları başka bir fonksiyona ayrılır. Component'leri export eden fonksiyon ismi aynı tutulur (bir nevi UI ve entegrasyon katmanı yine ayrılır) ve yerine Prod ve Mock hook'ları conditional olarak pass'leyen bir ara FC ve Mock hook'ları provide etmesi için bir MockProvider yazılır. Runtime'da Storybook main.ts ile ENV setlenir. Parent component ve altındaki tüm child component'lar, runtime env'sine bakarak [Mock yada Prod hook'ları](./scenario-2/parent-component.tsx) UI component'e props olarak geçer. Bu [provider](./scenario-2/mock-provider.tsx) Story arg'larını context'i için default value olarak pass'leyecek şekilde yazılır. [Story'de](./scenario-2/scenario-2.stories.tsx) ise istenilen DEFAULT yada başka prop configurasyonları uygulanabilir. Böylece Parent React Tree içinde refactor'e ihtiyaç yoktur. Sadece business hook'ların extract edilmesi yeterlidir.

#### Pros

1. Parent component'lerin render function'larındaki Tree değişmeyecek.
2. Prop drilling olmayacak.

#### Cons

1. Business hook'ları bu durumda da refactor edilmek zorundadır.
2. Her bir Story için Parent component ve altındaki tüm child component'lar hook açısından refactor edilmelidir. Her bir React tree ve içindeki tüm component'lerin prop alabileceği bir MockProvider yazılmalıdır.
