"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Image,
  Calendar,
  Globe,
  ChevronDown,
} from "lucide-react";
import {
  useDonationRecord,
  useDonationStatusUpdate,
  type DonorDetails,
  type DonationRecord,
  type DonationRecordResponse,
} from "@/lib/queries";

export default function TrackingPage() {
  const params = useParams();
  const trackingCode = params.tracking as string;

  const [feedback, setFeedback] = useState("");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [currentLang, setCurrentLang] = useState("fr");
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const languages = {
    fr: { name: "FR", flag: "🇫🇷" },
    ar: { name: "AR", flag: "🇩🇿" },
    en: { name: "EN", flag: "🇬🇧" },
  };

  const translations = {
    fr: {
      title: "Suivi de Donation",
      trackingCode: "Code de Suivi:",
      currentStatus: "Statut Actuel",
      updated: "Mis à jour:",
      statusHistory: "Historique des Statuts:",
      donationDetails: "Détails de la Donation",
      animalType: "Type d'Animal:",
      created: "Créé:",
      donorInfo: "Informations du Donateur:",
      name: "Nom:",
      phone: "Téléphone:",
      wilaya: "Wilaya:",
      amount: "Montant:",
      proofOfSacrifice: "Preuve de Sacrifice",
      description: "Description:",
      images: "Images:",
      video: "Vidéo:",
      uploaded: "Téléchargé:",
      updateStatus: "Mettre à Jour le Statut",
      markPending: "Marquer comme En Attente",
      markProceeded: "Marquer comme Traité",
      reject: "Rejeter",
      rejectionFeedback: "Commentaire de Rejet:",
      feedbackPlaceholder: "Veuillez fournir une raison pour le rejet...",
      confirmRejection: "Confirmer le Rejet",
      cancel: "Annuler",
      updating: "Mise à jour...",
      loading: "Chargement des informations de suivi...",
      error: "Erreur",
      tryAgain: "Réessayer",
      notFound: "Introuvable",
      noRecord:
        "Aucun enregistrement de donation trouvé pour ce code de suivi.",
      failedToFetch: "Échec du chargement du statut de donation",
      failedToUpdate: "Échec de la mise à jour du statut",
      provideFeedback: "Veuillez fournir un commentaire pour le rejet",
      updatingStatus: "Mise à jour du statut...",
      videoNotSupported: "Votre navigateur ne supporte pas la balise vidéo.",
      statuses: {
        pending: "En Attente",
        proceeded: "Traité",
        completed: "Terminé",
        rejected: "Rejeté",
      },
    },
    ar: {
      title: "تتبع التبرع",
      trackingCode: "رمز التتبع:",
      currentStatus: "الحالة الحالية",
      updated: "محدث:",
      statusHistory: "تاريخ الحالة:",
      donationDetails: "تفاصيل التبرع",
      animalType: "نوع الحيوان:",
      created: "تم الإنشاء:",
      donorInfo: "معلومات المتبرع:",
      name: "الاسم:",
      phone: "الهاتف:",
      wilaya: "الولاية:",
      amount: "المبلغ:",
      proofOfSacrifice: "دليل الذبح",
      description: "الوصف:",
      images: "الصور:",
      video: "الفيديو:",
      uploaded: "تم الرفع:",
      updateStatus: "تحديث الحالة",
      markPending: "وضع علامة قيد الانتظار",
      markProceeded: "وضع علامة تم المعالجة",
      reject: "رفض",
      rejectionFeedback: "تعليق الرفض:",
      feedbackPlaceholder: "يرجى تقديم سبب للرفض...",
      confirmRejection: "تأكيد الرفض",
      cancel: "إلغاء",
      updating: "جارٍ التحديث...",
      loading: "تحميل معلومات التتبع...",
      error: "خطأ",
      tryAgain: "أعد المحاولة",
      notFound: "غير موجود",
      noRecord: "لم يتم العثور على سجل تبرع لرمز التتبع هذا.",
      failedToFetch: "فشل في تحميل حالة التبرع",
      failedToUpdate: "فشل في تحديث الحالة",
      provideFeedback: "يرجى تقديم تعليق للرفض",
      updatingStatus: "تحديث الحالة...",
      videoNotSupported: "متصفحك لا يدعم علامة الفيديو.",
      statuses: {
        pending: "قيد الانتظار",
        proceeded: "تم المعالجة",
        completed: "مكتمل",
        rejected: "مرفوض",
      },
    },
    en: {
      title: "Donation Tracking",
      trackingCode: "Tracking Code:",
      currentStatus: "Current Status",
      updated: "Updated:",
      statusHistory: "Status History:",
      donationDetails: "Donation Details",
      animalType: "Animal Type:",
      created: "Created:",
      donorInfo: "Donor Information:",
      name: "Name:",
      phone: "Phone:",
      wilaya: "Wilaya:",
      amount: "Amount:",
      proofOfSacrifice: "Proof of Sacrifice",
      description: "Description:",
      images: "Images:",
      video: "Video:",
      uploaded: "Uploaded:",
      updateStatus: "Update Status",
      markPending: "Mark as Pending",
      markProceeded: "Mark as Proceeded",
      reject: "Reject",
      rejectionFeedback: "Rejection Feedback:",
      feedbackPlaceholder: "Please provide a reason for rejection...",
      confirmRejection: "Confirm Rejection",
      cancel: "Cancel",
      updating: "Updating...",
      loading: "Loading tracking information...",
      error: "Error",
      tryAgain: "Try Again",
      notFound: "Not Found",
      noRecord: "No donation record found for this tracking code.",
      failedToFetch: "Failed to fetch donation status",
      failedToUpdate: "Failed to update status",
      provideFeedback: "Please provide feedback for rejection",
      updatingStatus: "Updating status...",
      videoNotSupported: "Your browser does not support the video tag.",
      statuses: {
        pending: "Pending",
        proceeded: "Proceeded",
        completed: "Completed",
        rejected: "Rejected",
      },
    },
  };

  const t = translations[currentLang as "fr" | "ar" | "en"];
  const isRTL = currentLang === "ar";

  // React Query hooks
  const {
    data: donationRecord,
    isLoading,
    error,
    refetch,
  } = useDonationRecord(trackingCode);

  const updateStatusMutation = useDonationStatusUpdate(trackingCode);

  // Log tracking data when available
  if (donationRecord && trackingCode) {
    console.log("Tracking code:", trackingCode);
    console.log("Donation record:", donationRecord);
  }

  const handleStatusUpdate = (newStatus: string) => {
    if (newStatus === "rejected") {
      setShowFeedbackForm(true);
    } else {
      updateStatusMutation.mutate({ status: newStatus });
    }
  };

  const handleRejectWithFeedback = () => {
    if (feedback.trim()) {
      updateStatusMutation.mutate({
        status: "rejected",
        feedback: feedback.trim(),
      });
      setFeedback("");
      setShowFeedbackForm(false);
    } else {
      alert(t.provideFeedback);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "proceeded":
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "proceeded":
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-800 mb-2">{t.error}</h1>
            <p className="text-red-600 mb-4">
              {error instanceof Error ? error.message : t.failedToFetch}
            </p>
            <Button
              onClick={() => refetch()}
              className="bg-green-500 hover:bg-green-600"
            >
              {t.tryAgain}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!donationRecord) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              {t.notFound}
            </h1>
            <p className="text-gray-600">{t.noRecord}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 py-8 px-4 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 bg-white/80 backdrop-blur"
            >
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {languages[currentLang as "fr" | "ar" | "en"].flag}{" "}
                {languages[currentLang as "fr" | "ar" | "en"].name}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
            {showLangDropdown && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[100]">
                {Object.entries(languages).map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setCurrentLang(code);
                      setShowLangDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-800">
              {t.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">{t.trackingCode}</p>
              <p className="text-lg font-mono font-semibold text-green-700 bg-green-50 px-4 py-2 rounded-lg inline-block">
                {trackingCode}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(donationRecord.data.status)}
              {t.currentStatus}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Badge
                className={`${getStatusColor(
                  donationRecord.data.status
                )} border`}
              >
                {t.statuses[
                  donationRecord.data.status as keyof typeof t.statuses
                ] || donationRecord.data.status.toUpperCase()}
              </Badge>
              <div className="text-sm text-gray-500">
                <Calendar className="w-4 h-4 inline mr-1" />
                {t.updated}{" "}
                {new Date(donationRecord.data.updatedAt).toLocaleDateString()}
              </div>
            </div>

            {/* Status History */}
            {donationRecord.data.statusHistory &&
              donationRecord.data.statusHistory.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">{t.statusHistory}</h4>
                  <div className="space-y-1">
                    {donationRecord.data.statusHistory.map(
                      (status: string, index: number) => (
                        <div
                          key={index}
                          className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded"
                        >
                          {t.statuses[status as keyof typeof t.statuses] ||
                            status}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </CardContent>
        </Card>

        {/* Donation Details */}
        <Card>
          <CardHeader>
            <CardTitle>{t.donationDetails}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">{t.animalType}</h4>
                <p className="text-gray-600 capitalize">
                  {donationRecord.data.animalType}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t.created}</h4>
                <p className="text-gray-600">
                  {new Date(donationRecord.data.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Donors Details */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">{t.donorInfo}</h4>
              {donationRecord.data.donorsDetails?.map(
                (donor: DonorDetails, index: number) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <strong>{t.name}</strong> {donor.fullName}
                      </div>
                      <div>
                        <strong>{t.phone}</strong> {donor.phoneNumber}
                      </div>
                      <div>
                        <strong>{t.wilaya}</strong> {donor.wilaya}
                      </div>
                      <div>
                        <strong>{t.amount}</strong> {donor.amount} DZD
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Proof Details - Show only if status is "proceeded" */}
        {donationRecord.data.status.toLowerCase() === "proceeded" &&
          donationRecord.data.preuveDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  {t.proofOfSacrifice}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {donationRecord.data.preuveDetails.description && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">{t.description}</h4>
                    <p className="text-gray-600">
                      {donationRecord.data.preuveDetails.description}
                    </p>
                  </div>
                )}

                {donationRecord.data.preuveDetails.images &&
                  donationRecord.data.preuveDetails.images.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">{t.images}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {donationRecord.data.preuveDetails.images?.map(
                          (image: string, index: number) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Proof ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                              onClick={() => window.open(image, "_blank")}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}

                {donationRecord.data.preuveDetails.video && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">{t.video}</h4>
                    <video
                      src={donationRecord.data.preuveDetails.video}
                      controls
                      className="w-full max-h-64 rounded-lg"
                    >
                      {t.videoNotSupported}
                    </video>
                  </div>
                )}

                {donationRecord.data.preuveDetails.uploadDate && (
                  <div className="text-sm text-gray-500">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {t.uploaded}{" "}
                    {new Date(
                      donationRecord.data.preuveDetails.uploadDate
                    ).toLocaleDateString()}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

        {/* Status Update Controls */}
        <Card>
          <CardHeader>
            <CardTitle>{t.updateStatus}</CardTitle>
          </CardHeader>
          <CardContent>
            {!showFeedbackForm ? (
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => handleStatusUpdate("pending")}
                  disabled={updateStatusMutation.isPending}
                  variant="outline"
                  className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                >
                  {t.markPending}
                </Button>
                <Button
                  onClick={() => handleStatusUpdate("proceeded")}
                  disabled={updateStatusMutation.isPending}
                  className="bg-green-500 hover:bg-green-600"
                >
                  {t.markProceeded}
                </Button>
                <Button
                  onClick={() => handleStatusUpdate("rejected")}
                  disabled={updateStatusMutation.isPending}
                  variant="destructive"
                >
                  {t.reject}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.rejectionFeedback}
                  </label>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder={t.feedbackPlaceholder}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleRejectWithFeedback}
                    disabled={
                      updateStatusMutation.isPending || !feedback.trim()
                    }
                    variant="destructive"
                  >
                    {updateStatusMutation.isPending
                      ? t.updating
                      : t.confirmRejection}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowFeedbackForm(false);
                      setFeedback("");
                    }}
                    variant="outline"
                  >
                    {t.cancel}
                  </Button>
                </div>
              </div>
            )}

            {updateStatusMutation.isPending && (
              <div className="mt-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">{t.updatingStatus}</p>
              </div>
            )}

            {updateStatusMutation.error && (
              <div className="mt-4 text-center">
                <p className="text-sm text-red-600">
                  {t.error}:{" "}
                  {updateStatusMutation.error instanceof Error
                    ? updateStatusMutation.error.message
                    : t.failedToUpdate}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
