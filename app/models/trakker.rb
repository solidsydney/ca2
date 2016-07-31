class Trakker < ActiveRecord::Base
  attr_accessible :date, :destination_service_area, :location, :number, :origin_service_area, :signed_for_by, :status, :piece
end
