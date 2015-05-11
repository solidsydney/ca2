class TrakkersController < InheritedResources::Base
  def view
    number = params[:AWB].to_i
    type = [params[:brand]]
    @track = Trakker.where(number: number).order(:id)
  end
end

