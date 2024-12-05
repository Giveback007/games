interface GamePassItem {
    LastModifiedDate: string
    LocalizedProperties: LocalizedProperty[]
    MarketProperties: MarketProperty[]
    ProductASchema: string
    ProductBSchema: string
    ProductId: string
    Properties: Properties
    AlternateIds: any[]
    DomainDataVersion: any
    IngestionSource: string
    IsMicrosoftProduct: boolean
    PreferredSkuId: string
    ProductType: string
    ValidationData: ValidationData
    MerchandizingTags: any[]
    SandboxId: string
    ProductFamily: string
    SchemaVersion: string
    IsSandboxedProduct: boolean
    ProductKind: string
    ProductPolicies: ProductPolicies
    DisplaySkuAvailabilities: DisplaySkuAvailability[]
}

interface LocalizedProperty {
    DeveloperName: string
    PublisherName: string
    PublisherAddress: any
    PublisherWebsiteUri: string
    SupportUri: string
    SupportPhone: any
    EligibilityProperties: EligibilityProperties
    Franchises: any[]
    Images: Image[]
    Videos: Video[]
    ProductDescription: string
    ProductTitle: string
    ShortTitle: string
    SortTitle: string
    FriendlyTitle: any
    ShortDescription: string
    SearchTitles: any[]
    VoiceTitle: string
    RenderGroupDetails: any
    ProductDisplayRanks: any[]
    InteractiveModelConfig: any
    Interactive3DEnabled: boolean
    Language: string
    Markets: string[]
}

interface EligibilityProperties {
    Remediations: Remediation[]
    Affirmations: Affirmation[]
}

interface Remediation {
    RemediationId: string
    Description: string
}

interface Affirmation {
    AffirmationId: string
    AffirmationProductId: string
    Description: string
}

interface Image {
    FileId: string
    EISListingIdentifier: EislistingIdentifier
    BackgroundColor: string
    Caption?: string
    FileSizeInBytes: number
    ForegroundColor: string
    Height: number
    ImagePositionInfo: string
    ImagePurpose: string
    UnscaledImageSHA256Hash: string
    Uri: string
    Width: number
}

interface EislistingIdentifier {
    ListingId: string
    AssetId: string
}

interface Video {
    Uri: string
    VideoPurpose: string
    Height: number
    Width: number
    AudioEncoding: string
    VideoEncoding: string
    VideoPositionInfo: string
    Caption: string
    FileSizeInBytes: number
    PreviewImage: PreviewImage
    TrailerId: string
    SortOrder: number
}

interface PreviewImage {
    FileId: string
    EISListingIdentifier: any
    BackgroundColor: any
    Caption: string
    FileSizeInBytes: number
    ForegroundColor: any
    Height: number
    ImagePositionInfo: any
    ImagePurpose: string
    UnscaledImageSHA256Hash: string
    Uri: string
    Width: number
}

interface MarketProperty {
    OriginalReleaseDate: string
    MinimumUserAge: number
    ContentRatings: ContentRating[]
    RelatedProducts: RelatedProduct[]
    UsageData: UsageDaum[]
    BundleConfig: any
    Markets: string[]
}

interface ContentRating {
    RatingSystem: string
    RatingId: string
    RatingDescriptors: string[]
    RatingDisclaimers: string[]
    InteractiveElements: string[]
}

interface RelatedProduct {
    RelatedProductId: string
    RelationshipType: string
}

interface UsageDaum {
    AggregateTimeSpan: string
    AverageRating: number
    PlayCount: number
    RatingCount: number
    RentalCount: string
    TrialCount: string
    PurchaseCount: string
}

interface Properties {
    Attributes: Attribute[]
    CanInstallToSDCard: boolean
    Category: string
    Categories: str[] | null;
    Subcategory: any
    IsAccessible: boolean
    IsDemo: boolean
    IsLineOfBusinessApp: boolean
    IsPublishedToLegacyWindowsPhoneStore: boolean
    IsPublishedToLegacyWindowsStore: boolean
    PackageFamilyName: string
    PackageIdentityName: string
    PublisherCertificateName: string
    PublisherId: string
    SkuDisplayGroups: SkuDisplayGroup[]
    XboxLiveTier: string
    XboxXPA: any
    XboxCrossGenSetId: any
    XboxConsoleGenOptimized: string[]
    XboxConsoleGenCompatible: string[]
    XboxLiveGoldRequired: boolean
    ExtendedMetadata: string
    XBOX: Xbox
    ExtendedClientMetadata: ExtendedClientMetadata
    OwnershipType: any
    PdpBackgroundColor: string
    HasAddOns: boolean
    RevisionId: string
    ProductGroupId: string
    ProductGroupName: string
    IsPrivateBeforeDateHint: string
}

interface Attribute {
    Name: string
    Minimum?: number
    Maximum?: number
    ApplicablePlatforms?: string[]
    Group: any
}

interface SkuDisplayGroup {
    Id: string
    Treatment: string
}

interface Xbox {
    XboxProperties: string
    SubmissionId: string
    XboxGamingMetadata: string
}

interface ExtendedClientMetadata { }

interface ValidationData {
    PassedValidation: boolean
    RevisionId: string
    ValidationResultUri: any
}

interface ProductPolicies { }

interface DisplaySkuAvailability {
    Sku: Sku
    Availabilities: Availability[]
    HistoricalBestAvailabilities: HistoricalBestAvailability[]
}

interface Sku {
    LastModifiedDate: string
    LocalizedProperties: LocalizedProperty2[]
    MarketProperties: MarketProperty2[]
    ProductId: string
    Properties: Properties2
    SkuASchema: string
    SkuBSchema: string
    SkuId: string
    SkuType: string
    RecurrencePolicy: any
    SubscriptionPolicyId: any
}

interface LocalizedProperty2 {
    Contributors: any[]
    Features: any[]
    MinimumNotes: string
    RecommendedNotes: string
    ReleaseNotes: string
    DisplayPlatformProperties: any
    SkuDescription: string
    SkuTitle: string
    SkuButtonTitle: string
    DeliveryDateOverlay: any
    SkuDisplayRank: SkuDisplayRank[]
    TextResources: any
    Images: any[]
    LegalText: LegalText
    Language: string
    Markets: string[]
}

interface SkuDisplayRank {
    Dimension: string
    Rank: number
}

interface LegalText {
    AdditionalLicenseTerms: string
    Copyright: string
    CopyrightUri: string
    PrivacyPolicy: string
    PrivacyPolicyUri: string
    Tou: string
    TouUri: string
}

interface MarketProperty2 {
    FirstAvailableDate: string
    SupportedLanguages: string[]
    PackageIds: any
    PIFilter: any
    Markets: string[]
}

interface Properties2 {
    EarlyAdopterEnrollmentUrl: any
    FulfillmentData: any
    FulfillmentType: any
    FulfillmentPluginId: any
    HasThirdPartyIAPs: boolean
    LastUpdateDate: string
    HardwareProperties: any
    HardwareRequirements: any[]
    HardwareWarningList: any[]
    InstallationTerms: string
    Packages: any[]
    VersionString: string
    SkuDisplayGroupIds: string[]
    XboxXPA: boolean
    BundledSkus: BundledSku[]
    IsRepurchasable: boolean
    SkuDisplayRank: number
    DisplayPhysicalStoreInventory: any
    VisibleToB2BServiceIds: any[]
    AdditionalIdentifiers: any[]
    IsTrial: boolean
    IsPreOrder: boolean
    IsBundle: boolean
}

interface BundledSku {
    BigId: string
    DisplayRank: number
    IsPrimary: boolean
    FulfillmentType: any
}

interface Availability {
    Actions: string[]
    AvailabilityASchema: string
    AvailabilityBSchema: string
    AvailabilityId: string
    Conditions: Conditions
    LastModifiedDate: string
    Markets: string[]
    OrderManagementData: OrderManagementData
    Properties: Properties3
    SkuId: string
    DisplayRank: number
    RemediationRequired: boolean
    Remediations?: Remediation2[]
    LicensingData?: LicensingData
    AffirmationId?: string
}

interface Conditions {
    ClientConditions: ClientConditions
    EndDate: string
    ResourceSetIds: string[]
    StartDate: string
}

interface ClientConditions {
    AllowedPlatforms: AllowedPlatform[]
}

interface AllowedPlatform {
    MaxVersion: number
    MinVersion: number
    PlatformName: string
}

interface OrderManagementData {
    GrantedEntitlementKeys: any[]
    PIFilter?: Pifilter
    Price: Price
    OrderManagementPolicyIdOverride?: string
    GeofencingPolicyId?: string
}

interface Pifilter {
    ExclusionProperties: any[]
    InclusionProperties: any[]
}

interface Price {
    CurrencyCode: string
    IsPIRequired: boolean
    ListPrice: number
    MSRP: number
    TaxType: string
    WholesaleCurrencyCode: string
    WholesalePrice?: number
}

interface Properties3 {
    OriginalReleaseDate?: string
}

interface Remediation2 {
    RemediationId: string
    Type: string
    BigId: string
}

interface LicensingData {
    SatisfyingEntitlementKeys: SatisfyingEntitlementKey[]
}

interface SatisfyingEntitlementKey {
    EntitlementKeys: string[]
    LicensingKeyIds: string[]
}

interface HistoricalBestAvailability {
    Actions: string[]
    AvailabilityASchema: string
    AvailabilityBSchema: string
    AvailabilityId: string
    Conditions: Conditions2
    LastModifiedDate: string
    Markets: string[]
    OrderManagementData: OrderManagementData2
    Properties: Properties4
    SkuId: string
    DisplayRank: number
    ProductASchema: string
}

interface Conditions2 {
    ClientConditions: ClientConditions2
    EndDate: string
    ResourceSetIds: string[]
    StartDate: string
    EligibilityPredicateIds: string[]
    SupportedCatalogVersion: number
}

interface ClientConditions2 {
    AllowedPlatforms: AllowedPlatform2[]
}

interface AllowedPlatform2 {
    MaxVersion: number
    MinVersion: number
    PlatformName: string
}

interface OrderManagementData2 {
    GrantedEntitlementKeys: any[]
    PIFilter: Pifilter2
    Price: Price2
}

interface Pifilter2 {
    ExclusionProperties: any[]
    InclusionProperties: any[]
}

interface Price2 {
    CurrencyCode: string
    IsPIRequired: boolean
    ListPrice: number
    MSRP: number
    TaxType: string
    WholesaleCurrencyCode: string
    WholesalePrice: number
}

interface Properties4 {
    OriginalReleaseDate: string
}
