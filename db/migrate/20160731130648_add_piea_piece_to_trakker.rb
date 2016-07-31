class AddPieaPieceToTrakker < ActiveRecord::Migration
  def change
    add_column :trakkers, :piece, :string
  end
end
