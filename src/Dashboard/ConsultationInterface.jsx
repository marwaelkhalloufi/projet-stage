import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ConsultationInterface() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-300 rounded-3xl p-8 space-y-8">
        {/* Consultation Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="bg-white border-2 border-black text-black font-medium px-8 py-2 rounded-full hover:bg-gray-50"
          >
            Consultation
          </Button>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="Entrez le numero de mission"
              className="bg-white border-0 rounded-full px-4 py-3 text-sm placeholder:text-gray-600 text-center"
            />
          </div>
          <div>
            <Input
              placeholder="NUMERO"
              className="bg-white border-0 rounded-full px-4 py-3 text-sm placeholder:text-gray-800 placeholder:font-medium text-center"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-8 pt-4">
          <Button
            variant="outline"
            className="bg-white border-0 text-black font-medium px-8 py-2 rounded-full hover:bg-gray-50"
          >
            Oui
          </Button>
          <Button
            variant="outline"
            className="bg-white border-0 text-black font-medium px-8 py-2 rounded-full hover:bg-gray-50"
          >
            Non
          </Button>
        </div>
      </div>
    </div>
  )
}
